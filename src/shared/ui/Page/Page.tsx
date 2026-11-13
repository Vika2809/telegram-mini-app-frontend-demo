import { hideBackButton, onBackButtonClick, showBackButton } from '@telegram-apps/sdk-react';
import cn from 'classnames';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Page.module.scss';

// Варианты отступов по краям страницы
export type PagePadding = 'primary' | 'secondary';

interface PageProps {
    children: React.ReactNode;
    back?: boolean;
    className?: string;
    padding?: PagePadding;
}

export const Page = ({ children, back = true, className, padding = 'primary' }: PageProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (back) {
            showBackButton();
            return onBackButtonClick(() => {
                navigate(-1);
            });
        }
        hideBackButton();
    }, [back, navigate]);

    return <div className={cn(styles.Page, className, styles[padding])}>{children}</div>;
};
