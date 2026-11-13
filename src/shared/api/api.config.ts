// import { authApi } from '@/entities/Auth'; // Убираем импорт на уровне модуля для избежания циклической зависимости
import {
    ACCESS_TOKEN_LOCALSTORAGE_KEY,
    INIT_DATA_LOCALSTORAGE_KEY,
    REFRESH_TOKEN_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';
import { returnError } from '@/shared/lib/error';
import { Storage } from '@/shared/lib/storage/storage';
import { BaseQueryApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Интерфейс для Telegram Web App
interface TelegramWebApp {
    WebApp?: unknown;
}

// Расширение интерфейса Window
declare global {
    interface Window {
        Telegram?: TelegramWebApp;
    }
}

// Переменная для отслеживания состояния обновления токена
let isRefreshing = false;
// Promise, который будет разрешен после обновления токена
let refreshPromise: Promise<string | null> | null = null;
// TODO: Пройти по проекту и вырезать все костыли что были связаны с гонкой запросов

const baseQuery = fetchBaseQuery({
    baseUrl: __API__,
    credentials: 'include',
    timeout: 30000, // 30 секунд timeout для медленных мобильных соединений
    prepareHeaders: (headers) => {
        const token = Storage.getItem(ACCESS_TOKEN_LOCALSTORAGE_KEY);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        // Дополнительные заголовки для мобильных устройств
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');

        // Заголовки для Telegram Mini App
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            headers.set('x-telegram-init-data', Storage.getItem(INIT_DATA_LOCALSTORAGE_KEY) || '');
        }

        return headers;
    },
});

// Функция для обновления токена
const refreshToken = async (api: BaseQueryApi): Promise<string | null> => {
    // Если уже идет обновление, возвращаем существующий Promise
    if (isRefreshing) {
        return refreshPromise;
    }

    // Устанавливаем флаг и создаем Promise
    isRefreshing = true;
    refreshPromise = new Promise<string | null>((resolve) => {
        const refreshTokenValue = Storage.getItem(REFRESH_TOKEN_LOCALSTORAGE_KEY);

        if (!refreshTokenValue) {
            resolve(null);
            return;
        }

        // Получаем authApi динамически для избежания циклической зависимости
        import('@/entities/Auth')
            .then((authModule) => {
                const initData = Storage.getItem(INIT_DATA_LOCALSTORAGE_KEY) || '';
                return api.dispatch(authModule.authApi.endpoints.telegramLogin.initiate({ initData })).unwrap();
            })
            .then((tokenResult) => {
                if (tokenResult.code === 200 && tokenResult.data) {
                    const { accessToken } = tokenResult.data;
                    Storage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
                    resolve(accessToken);
                } else {
                    resolve(null);
                }
            })
            .catch((error) => {
                console.error('Ошибка обновления токена:', error);
                Storage.clearAllForUser();
                // TODO: Использовать роутер вместо window.location для Telegram Mini App
                // navigate('/login') или dispatch logout action
                resolve(null);
            })
            .finally(() => {
                // Сбрасываем флаг и Promise после завершения
                isRefreshing = false;
                refreshPromise = null;
            });
    });

    return refreshPromise;
};

// Обернем `baseQuery` для обработки ошибок
export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    let response = await baseQuery(args, api, extraOptions);
    const requestUrl = response.meta?.request?.url;

    if (response.error) {
        const result = returnError(response.error);
        if (
            result.code === 401 &&
            requestUrl &&
            !requestUrl.includes('auth/refresh-tokens') &&
            !requestUrl.includes('auth/tma-login')
        ) {
            // Ожидаем обновления токена или запускаем процесс обновления
            const newToken = await refreshToken(api);

            // Если получили новый токен, повторяем исходный запрос
            if (newToken) {
                response = await baseQuery(args, api, extraOptions);
            }
        } else {
            console.error(result.message);
        }
    }

    return response;
};
