// ================= Внешние типы =================
// Эти типы импортированы из других модулей

/**
 * @interface IAccount (из @/store/user/IUserState)
 * @description Интерфейс для данных аккаунта пользователя.
 * @deprecated убрать
 * @remarks Этот тип используется внутри IUser, поэтому он также перенесен сюда для полноты.
 */
export interface IAccount {
    id: string;
    name: string;
    image: string;
    UNIQ: string;
    isConfigurated: boolean;
    isActive: boolean;
    isDisabled: boolean;
    subscriptionId: string;
    // config: IConfig; // Закомментировано, т.к. IConfig здесь не определен и не требуется для Auth
    createdAt: Date;
    updatedAt: Date;
    remainingMinutes: number;
}

/**
 * @interface IUser (из @/store/user/IUserState)
 * @deprecated убрать
 * @description Основной интерфейс для данных пользователя.
 */
export interface IUser {
    id: string;
    email: string;
    notificationEmails: string;
    avatar: string;
    account: IAccount; // Используем локально определенный IAccount
    accountId: string;
}

// ================= Локальные типы =================
// Эти типы определены и используются внутри модуля Auth

/**
 * @interface IResetPasswordDto
 * @deprecated убрать
 * @description DTO для сброса пароля.
 */
export interface IResetPasswordDto {
    email: string;
    password: string;
    passwordRepeat: string;
    token: string; // Токен сброса пароля из email
}

/**
 * @interface ILoginDto
 * @description DTO для входа пользователя.
 */
export interface ILoginDto {
    initData?: string;
}

/**
 * @interface INewUser
 * @description Ответ при успешном логине или обновлении токена.
 * Содержит токен доступа и рефреш токен.
 */
export interface INewUser {
    accessToken: string;
    refreshToken: string;
}

/**
 * @interface IForgotDto
 * @deprecated убрать
 * @description Стандартный ответ для операций, связанных с восстановлением пароля
 * (запрос на сброс, валидация токена, успешный сброс).
 */
export interface IForgotDto {
    success: boolean;
    message: string;
}
