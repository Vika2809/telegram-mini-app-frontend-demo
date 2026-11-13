export interface User {
    id: number;
    telegramId: string;
    firstName: string;
    lastName: string;
    username: string;
    photoUrl: string;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
    settings: Record<string, string> | null;
}

export interface UserSchema {
    authData?: User;
    isLoginModalOpen: boolean;
    isLoading: boolean;
    error?: string;
    isTechnicalErrorModalOpen: boolean;
    _initialized: boolean;
    _isInitialLoading: boolean;
}

// api

export interface FetchUserResponse {
    success: boolean;
    user: User;
}

//
