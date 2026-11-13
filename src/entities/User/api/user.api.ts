import { rtkApi } from '@/shared/api/rtkApi';
import { IApiResponse } from '@/shared/model';
import { User } from '../model/types/userSchema';

export const authApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation<IApiResponse<User>, void>({
            query: () => ({
                url: 'user/me',
                method: 'GET',
            }),
        }),
        getUserSettings: builder.query<IApiResponse<Record<string, string>>, void>({
            query: () => ({
                url: 'user/me/settings',
                method: 'GET',
            }),
        }),
        updateUserSettings: builder.mutation<IApiResponse<Record<string, string>>, Record<string, string>>({
            query: (settings) => ({
                url: 'user/me/settings',
                method: 'PATCH',
                body: settings,
            }),
        }),
    }),
});

export const {
    useGetUserMutation: useGetUser,
    useGetUserSettingsQuery: useGetUserSettings,
    useUpdateUserSettingsMutation: useUpdateUserSettings,
} = authApi;
