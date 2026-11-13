import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/userSchema';

const namespace = 'user';

const initialState: UserSchema = {
    authData: undefined,
    isLoginModalOpen: false,
    isLoading: false,
    isTechnicalErrorModalOpen: false,
    _initialized: false,
    _isInitialLoading: true,
};

export const userSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        setUserInitialized: (state, action: PayloadAction<boolean>) => {
            state._initialized = action.payload;
        },
        setInitialLoading: (state, action: PayloadAction<boolean>) => {
            state._isInitialLoading = action.payload;
        },
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        logout: (state) => {
            state.authData = undefined;
            state._initialized = false;
            state._isInitialLoading = false;
        },
        setIsTechnicalErrorModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isTechnicalErrorModalOpen = action.payload;
        },
    },
    extraReducers: () => {},
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
