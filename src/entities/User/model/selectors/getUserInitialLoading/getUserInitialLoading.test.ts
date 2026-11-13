import { StateSchema } from '@/app/providers/StoreProvider';
import { DeepPartial } from '@/shared/lib/components/DeepPartial/DeepPartial';
import { getUserInitialLoading } from './getUserInitialLoading';

describe('getUserInitialLoading', () => {
    test('должен вернуть true, если начальная загрузка активна', () => {
        const isInitialLoading = true;

        const state: DeepPartial<StateSchema> = {
            user: {
                _isInitialLoading: isInitialLoading,
            },
        };

        expect(getUserInitialLoading(state as StateSchema)).toEqual(isInitialLoading);
    });

    test('должен вернуть false, если начальная загрузка неактивна', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                _isInitialLoading: false,
            },
        };

        expect(getUserInitialLoading(state as StateSchema)).toBe(false);
    });

    test('должен вернуть false, если состояние user отсутствует', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getUserInitialLoading(state as StateSchema)).toBe(false);
    });
});
