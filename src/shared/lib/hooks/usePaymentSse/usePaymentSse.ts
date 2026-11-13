import { PaymentEvent, paymentSseService } from '@/shared/lib/sse/payment-sse.service';
import { useEffect, useRef } from 'react';

export const usePaymentSse = (userId: number | undefined, onPaymentSuccess?: (event: PaymentEvent) => void) => {
    const unsubscribeRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        if (!userId) {
            paymentSseService.disconnect();
            return;
        }

        // Подключаемся к SSE
        paymentSseService.connect(userId);

        // Подписываемся на события
        if (onPaymentSuccess) {
            unsubscribeRef.current = paymentSseService.onPaymentEvent((event) => {
                if (event.status === 'PAID') {
                    onPaymentSuccess(event);
                }
            });
        }

        // Очистка при размонтировании
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
            paymentSseService.disconnect();
        };
    }, [userId, onPaymentSuccess]);
};
