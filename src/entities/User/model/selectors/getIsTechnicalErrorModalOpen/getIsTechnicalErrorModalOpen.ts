import { StateSchema } from '@/app/providers/StoreProvider';

export const getIsTechnicalErrorModalOpen = (state: StateSchema) => state.user.isTechnicalErrorModalOpen;
