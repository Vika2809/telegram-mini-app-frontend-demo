import { RequireAuth } from '@/app/providers/router/ui/RequireAuth';
import { getUserInitialized, getUserInitialLoading } from '@/entities/User';
import { AppRoutesProps } from '@/shared/config/routerConfig/routerConfig';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { PageLoader } from '@/widgets/PageLoader';
import { memo, Suspense, useCallback } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routerConfig } from '../config/routeConfig';

const AppRouter = () => {
    const isInitialLoading = useAppSelector(getUserInitialLoading);
    const isInitialized = useAppSelector(getUserInitialized);

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">{route.element}</div>
            </Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);

    // Показываем PageLoader во время начальной загрузки приложения
    // или если пользователь ещё не инициализирован
    if (isInitialLoading || !isInitialized) {
        return <PageLoader />;
    }

    return (
        <Routes>
            {Object.values(routerConfig).map(renderWithWrapper)}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default memo(AppRouter);
