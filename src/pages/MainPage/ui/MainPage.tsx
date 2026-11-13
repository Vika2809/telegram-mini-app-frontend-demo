import {
    getRouteMeeting,
    getRouteMeetingsMenu,
    getRouteTest1,
    getRouteTest2,
} from '@/shared/config/routerConfig/routerConfig';
import { returnError } from '@/shared/lib/error';
import { Button } from '@/shared/ui/Button/Button';
import { Link } from '@/shared/ui/Link/Link';
import { Page } from '@/shared/ui/Page/Page';
import { WalletActions } from '@/widgets/WalletActions';
import { useTonConnectUI } from '@tonconnect/ui-react';
import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './MainPage.module.scss';

interface MainPageProps {
    className?: string;
}

// Это главная страница для разработки при сборке на лайф убрать ее из роутинга

const MainPage = (props: MainPageProps) => {
    const { className } = props;
    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);

    const handleWalletConnection = useCallback((address: string) => {
        setTonWalletAddress(address);
        console.log('Wallet connected successfully!');
    }, []);

    const handleWalletDisconnection = useCallback(() => {
        setTonWalletAddress(null);
        console.log('Wallet disconnected successfully!');
    }, []);

    useEffect(() => {
        const checkWalletConnection = async () => {
            if (tonConnectUI.account?.address) {
                handleWalletConnection(tonConnectUI.account?.address);
            } else {
                handleWalletDisconnection();
            }
        };

        checkWalletConnection();

        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                handleWalletConnection(wallet.account.address);
            } else {
                handleWalletDisconnection();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

    const handleWalletAction = async () => {
        if (tonConnectUI.connected) {
            await tonConnectUI.disconnect();
        } else {
            await tonConnectUI.openModal();
        }
    };

    // Функции для тестирования разных типов ошибок
    const handleToastifyError = () => {
        toast.error('Ошибка toastify');
    };

    const handleNetworkError = () => {
        const networkError = new TypeError('Failed to fetch');
        returnError(networkError);
    };

    const handleTimeoutError = () => {
        const timeoutError = new Error('Request timeout');
        timeoutError.name = 'TimeoutError';
        returnError(timeoutError);
    };

    const handleServerError = () => {
        returnError({
            response: {
                status: 500,
                statusText: 'Internal Server Error',
                data: { message: 'Внутренняя ошибка сервера', statusCode: 500 },
            },
        });
    };

    const handleCorsError = () => {
        const corsError = new Error('CORS policy: Request blocked');
        returnError(corsError);
    };

    const handleSslError = () => {
        const sslError = new Error('SSL certificate verification failed');
        returnError(sslError);
    };

    const handleNoInternetError = () => {
        // Временно устанавливаем navigator.onLine в false для имитации
        Object.defineProperty(navigator, 'onLine', {
            writable: true,
            value: false,
        });

        returnError({
            response: {
                status: 0,
                statusText: 'No Internet Connection',
            },
        });

        // Возвращаем обратно через 1 секунду
        setTimeout(() => {
            Object.defineProperty(navigator, 'onLine', {
                writable: true,
                value: true,
            });
        }, 1000);
    };

    const handleBadRequestError = () => {
        // Этот тип ошибки НЕ должен показать toast (валидационная ошибка)
        returnError({
            response: {
                status: 400,
                statusText: 'Bad Request',
                data: { message: 'Неверные данные', statusCode: 400 },
            },
        });
    };

    return (
        <Page back={false} className={cn(styles.MainPage, className)}>
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.main_card}>
                        {tonWalletAddress ? (
                            <WalletActions onDisconnect={handleWalletAction} />
                        ) : (
                            <Button theme="primary" onClick={handleWalletAction}>
                                Подключить TON-кошелёк
                            </Button>
                        )}
                    </div>

                    <div className={styles.main_features}>
                        <div className={styles.feature_item}>
                            <div className={styles.feature_icon}>🚀</div>
                            <Link to={getRouteTest1()}>станица 1</Link>
                        </div>
                        <div className={styles.feature_item}>
                            <div className={styles.feature_icon}>💡</div>
                            <Link to={getRouteTest2()}>станица 2</Link>
                        </div>
                        <div className={styles.feature_item}>
                            <div className={styles.feature_icon}>💡</div>
                            <Link to={getRouteMeetingsMenu()}>Страница митингов</Link>
                        </div>
                        <div className={styles.feature_item}>
                            <div className={styles.feature_icon}>💡</div>
                            <Link to={getRouteMeeting('1')}>Страница митинга</Link>
                        </div>
                    </div>

                    {/* Кнопки для тестирования toast ошибок */}
                    <div className={styles.error_test_section}>
                        <h3>Тестирование Toast Ошибок:</h3>

                        <div className={styles.error_buttons}>
                            <button onClick={handleToastifyError} className={styles.test_button}>
                                🔴 Обычный Toast Error
                            </button>

                            <button onClick={handleNoInternetError} className={styles.test_button}>
                                📶 Нет Интернета
                            </button>

                            <button onClick={handleNetworkError} className={styles.test_button}>
                                🌐 Сетевая Ошибка
                            </button>

                            <button onClick={handleTimeoutError} className={styles.test_button}>
                                ⏱️ Timeout Ошибка
                            </button>

                            <button onClick={handleServerError} className={styles.test_button}>
                                🖥️ Серверная Ошибка (500)
                            </button>

                            <button onClick={handleCorsError} className={styles.test_button}>
                                🚫 CORS Ошибка
                            </button>

                            <button onClick={handleSslError} className={styles.test_button}>
                                🔒 SSL Ошибка
                            </button>

                            <button onClick={handleBadRequestError} className={styles.test_button}>
                                ❌ Bad Request (без Toast)
                            </button>
                        </div>
                    </div>

                    {/* <UserCounter count={100} /> */}
                </div>
            </div>
        </Page>
    );
};

export default MainPage;
