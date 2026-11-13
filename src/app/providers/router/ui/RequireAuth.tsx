import { getUserAuthData, getUserInitialized, getUserInitialLoading } from '@/entities/User';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { PageLoader } from '@/widgets/PageLoader';
import { JSX } from 'react';

export function RequireAuth({ children }: Readonly<{ children: JSX.Element }>) {
    const auth = useAppSelector(getUserAuthData);
    const isInitialized = useAppSelector(getUserInitialized);
    const isInitialLoading = useAppSelector(getUserInitialLoading);

    // Показываем PageLoader во время начальной загрузки или если пользователь не инициализирован
    if (isInitialLoading || !isInitialized) {
        return <PageLoader />;
    }

    if (!auth) {
        // Перенаправляем на страницу, которая не требует авторизации
        // чтобы избежать циклической навигации
        throw new Error('Not authorized');
        // return <Navigate to={getRouteMeetingsMenu()} state={{ from: location }} replace />;
    }

    return children;
}
