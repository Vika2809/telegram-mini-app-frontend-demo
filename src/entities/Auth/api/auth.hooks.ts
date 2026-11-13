import { authApi } from './auth.api';

export const {
    useTelegramLoginMutation: useTelegramLogin,
    useCheckTokenMutation: useCheckToken,
    useLogoutMutation: useLogout,
    useForgotPasswordMutation: useForgotPassword,
    useValidateResetTokenMutation: useValidateResetToken,
    useResetPasswordMutation: useResetPassword,
} = authApi;
