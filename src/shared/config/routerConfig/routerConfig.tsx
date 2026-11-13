import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
};

export enum AppRoutes {
    MAIN = 'main',
    TEST1 = 'test1',
    TEST2 = 'test2',
    MEETINGS_MENU = 'meetings-menu',
    MEETING = 'meeting',
    // NOT_FOUND = 'not_found',
}

export const getRouteTest1 = () => '/test1';

export const getRouteTest2 = () => '/test2';

export const getRouteMeetingsMenu = () => '/meetings-menu';

export const getRouteMeeting = (uniqueId: string) => `/meeting/${uniqueId}`;
