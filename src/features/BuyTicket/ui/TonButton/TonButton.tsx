import { userActions } from '@/entities/User';
import TonIcon from '@/shared/assets/icons/TON.svg?react';
import { useAppDispatch } from '@/shared/lib';
import { useCreateOrder } from '@/shared/lib/hooks/useCreateOrder';
import { IButtonProps } from '@/shared/model';
import { Button } from '@/shared/ui/Button/Button';
import { HStack } from '@/shared/ui/Stack';
import { beginCell, toNano } from '@ton/ton';
import { useTonConnectUI } from '@tonconnect/ui-react';
import cn from 'classnames';
import { FC, useCallback, useEffect, useState } from 'react';
import styles from './TonButton.module.scss';

export const TonButton: FC<IButtonProps> = (props) => {
    const { className, onError, onSuccess } = props;
    const [tonConnectUI] = useTonConnectUI();
    const dispatch = useAppDispatch();

    const [isConnectButton, setIsConnectButton] = useState(false);
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);

    const handleWalletConnection = useCallback(
        (address: string) => {
            setTonWalletAddress(address);
            if (isConnectButton) {
                handleClick();
                console.log('модалка открыта после подключения');
            }
            console.log('Wallet connected successfully!');
        },
        [isConnectButton],
    );

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
        console.log('tonConnectUI.connected', tonConnectUI.connected);
        if (tonConnectUI.connected) {
            handleClick();
            // await tonConnectUI.disconnect();
        } else {
            await tonConnectUI.openModal();
            setIsConnectButton(true);
        }
    };

    const handleDisconnect = async () => {
        await tonConnectUI.disconnect();
    };

    // Используем новый хук для создания заказа
    const { createOrder, isLoading } = useCreateOrder({
        // onSuccess,
        onError,
    });

    // Функция для отправки TON транзакции
    const handleBuyTicketTON = async (amount: number, uniqueId: string) => {
        const body = beginCell()
            .storeUint(0, 32) // write 32 zero bits to indicate that a text comment will follow
            .storeStringTail(`order_${uniqueId}`) // write our text comment
            .endCell();

        console.log('Сумма транзакции:', amount);

        const myTransaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: import.meta.env.VITE_TON_RECEIVER,
                    amount: toNano(amount).toString(),
                    payload: body.toBoc().toString('base64'), // payload with comment in body
                },
            ],
        };

        try {
            await tonConnectUI.sendTransaction(myTransaction);
            dispatch(userActions.setIsTechnicalErrorModalOpen(true));
            onSuccess?.();
        } catch (error) {
            console.error('Ошибка TON транзакции:', error);
            onError?.(error as Error);
        }
    };

    // Обработчик клика по кнопке
    const handleClick = async () => {
        const result = await createOrder('TON');

        if (result) {
            const { order } = result;
            const { uniqueId, totalAmount } = order;
            await handleBuyTicketTON(totalAmount, uniqueId);
        }
    };

    return (
        <>
            {__IS_DEV__ && tonWalletAddress && (
                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: '16px',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Button theme="secondary" onClick={handleDisconnect}>
                        Disconnect Wallet
                    </Button>
                </div>
            )}

            <Button
                theme="secondary"
                onClick={handleWalletAction}
                className={cn(styles.TonButton, className)}
                disabled={isLoading}
                maxWidth
            >
                {isLoading ? (
                    'Processing...'
                ) : (
                    <HStack gap="8">
                        <TonIcon width={24} height={24} /> TON
                    </HStack>
                )}
            </Button>
        </>
    );
};
