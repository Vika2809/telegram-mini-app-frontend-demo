import { toast } from 'react-toastify';
import { diagnoseMobileNetworkError } from '../diagnoseMobileNetworkError';

export interface ErrorPayload {
    message: string;
}

export interface IError {
    message: string;
    code: number;
}

// Вспомогательные типы, не экспортируются
interface ErrorResponse {
    message?: string;
    response?: {
        data?: {
            message: string;
            statusCode: number;
            errorCode?: number; // Добавлено поле errorCode
        };
        statusText?: string;
        status?: number;
    };
}

interface ErrorResponseSecond {
    message?: string;
    data?: {
        message: string;
        statusCode: number;
        errorCode?: number; // Добавлено поле errorCode
    };
    statusText?: string;
    status?: number;
}

/**
 * Определяет, является ли ошибка сетевой и нужно ли показать toast
 */
const shouldShowNetworkToast = (error: unknown, code: number): boolean => {
    // Не показываем toast для ошибок аутентификации (обрабатываются отдельно)
    if (code === 401) {
        return false;
    }

    // Показываем toast для серверных ошибок
    if (code >= 500) {
        return true;
    }

    // Показываем toast для сетевых ошибок
    if (code === 0 || !navigator.onLine) {
        return true;
    }

    // Проверяем на типичные сетевые ошибки
    if (error instanceof TypeError) {
        if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
            return true;
        }
    }

    if (error instanceof Error) {
        if (error.name === 'AbortError' || error.name === 'TimeoutError') {
            return true;
        }
        if (error.message.includes('CORS') || error.message.includes('SSL')) {
            return true;
        }
    }

    return false;
};

export const isErrorPayload = (payload: unknown): payload is ErrorPayload => {
    return typeof payload === 'object' && payload !== null && 'message' in payload;
};

/**
 * Обрабатывает различные форматы ошибок API и возвращает стандартизированный объект ошибки.
 * @param error Неизвестная ошибка, перехваченная из API.
 * @returns Объект IError со стандартизированным сообщением и кодом.
 */
export const returnError = (error: unknown): IError => {
    const err = error as ErrorResponse;
    const errorFromApi = error as ErrorResponseSecond;

    // console.error(err); // Для откладки ошибок
    const response = err?.response ?? errorFromApi;
    let result: IError;

    if (response) {
        if (response?.data) {
            // Проверяем наличие errorCode сначала
            if ('errorCode' in response.data && typeof response.data.errorCode === 'number') {
                result = {
                    message: Array.isArray(response.data.message)
                        ? response.data.message.join(' ')
                        : response.data.message || 'Что то пошло не так',
                    code: response.data.errorCode,
                };
            } else {
                // Иначе используем statusCode
                result = {
                    message: Array.isArray(response.data.message)
                        ? response.data.message.join(' ')
                        : response.data.message || 'Что то пошло не так',
                    code: response.data.statusCode || 400,
                };
            }
        } else {
            // Если нет data, используем статус ответа
            result = {
                message: response.statusText || 'Что то пошло не так',
                code: response.status || 400,
            };
        }
    } else {
        // Если нет response вообще
        result = {
            message: 'Что то пошло не так',
            code: 400,
        };
    }

    // Показываем toast для сетевых ошибок
    if (shouldShowNetworkToast(error, result.code)) {
        const networkMessage = diagnoseMobileNetworkError(error);

        toast.error(networkMessage, {
            toastId: `network-error-${result.code}`, // Предотвращаем дубликаты
            autoClose: result.code >= 500 ? 8000 : 6000, // Дольше показываем серверные ошибки
            position: 'top-center',
        });
    }

    return result;
};
