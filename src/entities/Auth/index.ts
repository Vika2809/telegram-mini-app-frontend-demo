// Экспорт API инстанса
export { authApi } from './api/auth.api';

// Экспорт хуков
export {
    useCheckToken,
    useForgotPassword,
    useLogout,
    useResetPassword,
    useTelegramLogin,
    useValidateResetToken,
} from './api/auth.hooks';

// Экспорт типов
export type { IAccount, IForgotDto, ILoginDto, INewUser, IResetPasswordDto, IUser } from './model/types/AuthSchema';
