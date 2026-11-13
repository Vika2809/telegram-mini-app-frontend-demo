export interface PaymentEvent {
    userId: number;
    orderId: string;
    status: 'PAID' | 'FAILED'; //TODO: add statuses
}

class PaymentSseService {
    private eventSource: EventSource | null = null;
    private listeners: ((event: PaymentEvent) => void)[] = [];

    connect(userId: number) {
        if (this.eventSource) {
            this.disconnect();
        }

        this.eventSource = new EventSource(`${__API__}/order/payment-status/${userId}`);

        this.eventSource.onmessage = (event) => {
            try {
                const data: PaymentEvent = JSON.parse(event.data);
                this.listeners.forEach((listener) => listener(data));
            } catch (error) {
                console.error('Ошибка парсинга SSE события:', error);
            }
        };

        this.eventSource.onerror = (error) => {
            console.error('SSE ошибка:', error);
            this.reconnect(userId);
        };
    }

    disconnect() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
        }
    }

    private reconnect(userId: number) {
        setTimeout(() => {
            this.connect(userId);
        }, 5000); // Переподключение через 5 секунд
    }

    onPaymentEvent(callback: (event: PaymentEvent) => void) {
        this.listeners.push(callback);

        // Возвращаем функцию для отписки
        return () => {
            const index = this.listeners.indexOf(callback);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
}

export const paymentSseService = new PaymentSseService();
