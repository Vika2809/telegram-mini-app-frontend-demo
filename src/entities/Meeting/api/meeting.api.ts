import { rtkApi } from '@/shared/api/rtkApi';
import { IApiResponse } from '@/shared/model';
import { IMeetingByIdDto, IMeetingResponse, IMeetingsDto } from '../model/types/MeetingSchema';

export const meetingApi = rtkApi.injectEndpoints({
    endpoints: (builder) => ({
        getMeetings: builder.query<IApiResponse<IMeetingResponse[]>, IMeetingsDto>({
            query: (data) => ({
                url: 'meetings',
                method: 'GET',
                params: data,
            }),
        }),
        getMeetingById: builder.query<IApiResponse<IMeetingResponse>, IMeetingByIdDto>({
            query: (data) => ({
                url: `meetings/${data.uniqueId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetMeetingsQuery: useGetMeetings, useGetMeetingByIdQuery: useGetMeetingById } = meetingApi;
