import { Link } from '@/shared/ui/Link/Link';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import cn from 'classnames';
import { FC } from 'react';
import styles from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage: FC<NotFoundPageProps> = (props) => {
    const { className } = props;
    return (
        <div className={cn(styles.NotFoundPage, className)}>
            <Text text="Страница не найдена" size={TextSize.BIG} />
            <Link to="/">На главную</Link>
        </div>
    );
};
