import { rtkApi } from '@/shared/api/rtkApi';
import { IApiResponse } from '@/shared/model';
import { ICreateOrderDto, ICreateOrderResponse } from '../model/types/BuyTicketSсhema';

export const buyTicketApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<IApiResponse<ICreateOrderResponse>, ICreateOrderDto>({
            query: (data) => ({
                body: data,
                url: '/orders/create',
                method: 'POST',
            }),
        }),
    }),
});

export const { useCreateOrderMutation: useCreateOrder } = buyTicketApi;
