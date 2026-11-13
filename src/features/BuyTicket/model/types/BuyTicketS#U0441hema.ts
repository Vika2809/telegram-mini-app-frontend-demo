// Добавляем экспорт типа для единообразия
export type PaymentMethod = 'TON' | 'STARS';

export interface ICreateOrderDto {
    meetingId: number;
    code: PaymentMethod;
    senderTonAddress: string;
}

export interface ICreateOrderResponse {
    order: {
        id: number;
        uniqueId: string;
        ticketCount: number;
        totalAmount: number;
        code: PaymentMethod;
        status: 'PENDING' | 'PAID' | 'EXPIRED'; // TODO: уточнить состояния
        address: string;
        userId: number;
        meetingId: number;
        createdAt: string;
        updatedAt: string;
    };
    invoiceLink: string | null;
}
