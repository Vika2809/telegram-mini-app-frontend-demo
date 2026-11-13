import { UserSchema } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';
import { Action, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';

export interface StateSchemaBase {
    user: UserSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export interface StateSchema extends StateSchemaBase {
    // async reducers
    // TODO: Снизу заглушка
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: Action) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}
