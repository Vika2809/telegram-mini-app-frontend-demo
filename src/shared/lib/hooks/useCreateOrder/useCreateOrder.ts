import { useCreateOrder as useCreateOrderMutation } from '@/features/BuyTicket/api/BuyTicket.api';
import { ICreateOrderResponse, PaymentMethod } from '@/features/BuyTicket/model/types/BuyTicketSсhema';
import { diagnoseMobileNetworkError } from '@/shared/lib/error';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Address } from '@ton/ton';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useState } from 'react';

interface UseCreateOrderOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

interface UseCreateOrderReturn {
    createOrder: (paymentMethod: PaymentMethod) => Promise<ICreateOrderResponse | undefined>;
    isLoading: boolean;
}

/**
 * Хук для создания заказа с общей логикой обработки ошибок
 * @param options - опции для обработки успешного/неуспешного результата
 * @returns объект с функцией создания заказа и состоянием загрузки
 */
export const useCreateOrder = (options: UseCreateOrderOptions = {}): UseCreateOrderReturn => {
    const { onSuccess, onError } = options;
    const [isLoading, setIsLoading] = useState(false);
    const [createOrderMutation] = useCreateOrderMutation();
    const [tonConnectUI] = useTonConnectUI();

    const createOrder = async (paymentMethod: PaymentMethod) => {
        setIsLoading(true);

        try {
            const rawAddress = tonConnectUI.account?.address;

            // Для TON проверяем подключение кошелька
            if (paymentMethod === 'TON' && !rawAddress) {
                alert('Пожалуйста, подключите TON кошелёк');
                return;
            }

            // Проверяем соединение с интернетом
            if (!navigator.onLine) {
                alert('Проверьте соединение с интернетом');
                return;
            }

            // Преобразуем адрес для TON
            const senderTonAddress = rawAddress
                ? paymentMethod === 'TON'
                    ? Address.parse(rawAddress).toString({
                          urlSafe: true,
                          bounceable: false,
                          testOnly: false,
                      })
                    : rawAddress.toString()
                : '';

            console.log(`Создание заказа для ${paymentMethod}:`, senderTonAddress);

            const response = await createOrderMutation({
                meetingId: 1,
                code: paymentMethod,
                senderTonAddress,
            });

            console.log('Ответ от API:', response);

            if (response.data?.code === 200) {
                const { order, invoiceLink } = response.data.data;

                onSuccess?.();

                // Возвращаем данные для дальнейшей обработки в компонентах
                return { order, invoiceLink };
            } else if (response.error) {
                // Обработка ошибок от RTK Query
                console.error('Ошибка API:', response.error);
                let errorMessage = 'Ошибка сервера';

                if ('data' in response.error) {
                    const fetchError = response.error as FetchBaseQueryError;
                    if (fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data) {
                        errorMessage = String((fetchError.data as { message: string }).message);
                    }
                }

                alert(`Ошибка создания заказа: ${errorMessage}`);
            } else {
                console.log('Неожиданный ответ:', response);
                alert(`Неожиданный ответ сервера. Адрес кошелька: ${rawAddress?.toString()}`);
            }
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);

            // Используем улучшенную диагностику для мобильных устройств
            const errorMessage = diagnoseMobileNetworkError(error);
            alert(errorMessage);

            onError?.(error as Error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createOrder,
        isLoading,
    };
};
