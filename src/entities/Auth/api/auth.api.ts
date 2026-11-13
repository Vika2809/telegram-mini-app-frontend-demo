import { rtkApi } from '@/shared/api/rtkApi';
import { IApiResponse } from '@/shared/model';
import { IForgotDto, ILoginDto, INewUser, IResetPasswordDto } from '../model/types/AuthSchema';

export const authApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        telegramLogin: builder.mutation<IApiResponse<INewUser>, ILoginDto>({
            query: (data: ILoginDto) => {
                console.log(`data`, data);

                function isLocalInitData(data: ILoginDto) {
                    return __IS_DEV__ && (data.initData === undefined || data.initData.includes('some-hash'));
                }

                return {
                    body: isLocalInitData(data)
                        ? {
                              initData: `local:${__LOCAL_TELEGRAM_ID__}`,
                              user: { firstName: 'test', lastName: 'test', username: 'test' },
                          }
                        : data,
                    url: 'auth/tma-login',
                    method: 'POST',
                    headers: {},
                };
            },
        }),
        checkToken: builder.mutation<IApiResponse<INewUser>, string>({
            query: (refreshToken: string) => ({
                url: `auth/refresh-tokens`,
                method: 'POST',
                body: { refreshToken },
                headers: {},
            }),
        }),
        logout: builder.mutation<string, void>({
            query: () => ({
                url: `auth/logout`,
                method: 'GET',
            }),
        }),
        forgotPassword: builder.mutation<IForgotDto, string>({
            query: (email: string) => ({
                body: { email },
                url: 'auth/forgot-password',
                method: 'POST',
                headers: {},
            }),
        }),
        validateResetToken: builder.mutation<IForgotDto, string>({
            query: (token: string) => ({
                body: { token },
                url: 'auth/validate-password-reset',
                method: 'POST',
                headers: {},
            }),
        }),
        resetPassword: builder.mutation<IForgotDto, IResetPasswordDto>({
            query: (data: IResetPasswordDto) => ({
                body: data,
                url: 'auth/reset-password',
                method: 'POST',
                headers: {},
            }),
        }),
    }),
});
