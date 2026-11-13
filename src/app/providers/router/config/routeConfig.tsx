import { MainPage } from '@/pages/MainPage';
import { MeetingPage } from '@/pages/MeetingPage';
import { MeetingsMenuPage } from '@/pages/MeetingsMenuPage';
import {
    AppRoutes,
    getRouteMeeting,
    getRouteMeetingsMenu,
    getRouteTest1,
    getRouteTest2,
} from '@/shared/config/routerConfig/routerConfig';
import { AppRoutesProps } from '@/shared/model';
import { Link } from '@/shared/ui/Link/Link';
import { Page } from '@/shared/ui/Page/Page';
import { Navigate } from 'react-router-dom';

export const getRouterConfig = (): Record<AppRoutes, AppRoutesProps> => {
    const baseConfig = {
        [AppRoutes.MEETINGS_MENU]: {
            path: getRouteMeetingsMenu(),
            element: <MeetingsMenuPage />,
        },
        [AppRoutes.MEETING]: {
            path: getRouteMeeting(':uniqueId'),
            element: <MeetingPage />,
        },
    };

    if (__IS_DEV__) {
        return {
            [AppRoutes.MAIN]: {
                path: '/',
                element: <MainPage />,
                authOnly: true,
            },
            [AppRoutes.TEST1]: {
                path: getRouteTest1(),
                element: (
                    <Page>
                        <div>
                            <h1>Test1Page</h1>
                            <Link to="/">На главную</Link>
                        </div>
                    </Page>
                ),
            },
            [AppRoutes.TEST2]: {
                path: getRouteTest2(),
                element: (
                    <Page back={false}>
                        <div>
                            <h1>Test2Page</h1>
                            <Link to="/">На главную</Link>
                        </div>
                    </Page>
                ),
            },
            ...baseConfig,
        };
    }

    // В production версии TEST роуты перенаправляют на главную
    return {
        [AppRoutes.MAIN]: {
            path: '/',
            element: <Navigate to={getRouteMeetingsMenu()} replace />,
        },
        [AppRoutes.TEST1]: {
            path: getRouteTest1(),
            element: <Navigate to={getRouteMeetingsMenu()} replace />,
        },
        [AppRoutes.TEST2]: {
            path: getRouteTest2(),
            element: <Navigate to={getRouteMeetingsMenu()} replace />,
        },
        ...baseConfig,
    };
};

// Для обратной совместимости экспортируем результат функции
export const routerConfig = getRouterConfig();
