import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserInitialLoading = (state: StateSchema) => state.user?._isInitialLoading || false;
