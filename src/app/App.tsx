import { AppRoutes } from '@/app/providers/router';
import { useTelegramLogin } from '@/entities/Auth';
import { useGetUser, userActions } from '@/entities/User';
import {
    ACCESS_TOKEN_LOCALSTORAGE_KEY,
    INIT_DATA_LOCALSTORAGE_KEY,
    REFRESH_TOKEN_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { paymentSseService } from '@/shared/lib/sse';
import { Storage } from '@/shared/lib/storage/storage';
import { useRawInitData } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';

function App() {
    const [telegramLogin] = useTelegramLogin();
    const dispatch = useAppDispatch();
    const [getUser] = useGetUser();
    const initData = useRawInitData();

    // Обработчик успешной оплаты
    const handlePaymentSuccess = (event: any) => {
        console.log('Оплата прошла успешно:', event);
        //Вызываем модалку о технической ошибке
        dispatch(userActions.setIsTechnicalErrorModalOpen(true));
    };

    useEffect(() => {
        const MIN_LOADING_TIME = 3000; // 3 секунды минимальной загрузки
        const startTime = Date.now();

        const finishInitialization = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

            setTimeout(() => {
                dispatch(userActions.setInitialLoading(false));
                dispatch(userActions.setUserInitialized(true));
            }, remainingTime);
        };

        const getUserFunction = async () => {
            try {
                const response = await getUser().unwrap();
                if (response.code === 200) {
                    dispatch(userActions.setAuthData(response.data));

                    // Подключаем SSE после успешного получения данных пользователя
                    if (response.data.id) {
                        paymentSseService.connect(response.data.id);
                        paymentSseService.onPaymentEvent(handlePaymentSuccess);
                    }
                }
            } catch (error) {
                console.error('Ошибка получения пользователя:', error);
            }
        };

        const loginByInitData = async () => {
            try {
                console.log(`initData`, initData);
                if (initData) {
                    const response = await telegramLogin({
                        initData,
                    }).unwrap();

                    if (response.code === 200) {
                        const { accessToken, refreshToken } = response.data;
                        Storage.setItem(ACCESS_TOKEN_LOCALSTORAGE_KEY, accessToken);
                        Storage.setItem(REFRESH_TOKEN_LOCALSTORAGE_KEY, refreshToken);
                        Storage.setItem(INIT_DATA_LOCALSTORAGE_KEY, initData);

                        await getUserFunction();
                    }
                }
            } catch (error) {
                console.error('Ошибка авторизации через Telegram:', error);
                Storage.clearAllForUser();
            } finally {
                // Завершаем инициализацию с учетом минимального времени загрузки
                finishInitialization();
            }
        };

        if (initData) {
            loginByInitData();
        } else {
            Storage.clearAllForUser();
            finishInitialization();
        }
    }, [dispatch, getUser, initData, telegramLogin]);

    return (
        <div>
            <AppRoutes />
        </div>
    );
}

export default App;
