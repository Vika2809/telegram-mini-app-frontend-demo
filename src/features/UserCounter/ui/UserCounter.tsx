import PlayerIcon from '@/shared/assets/icons/player.svg?react';
import cn from 'classnames';
import { FC } from 'react';
import styles from './UserCounter.module.scss';

interface UserCounterProps {
    className?: string;
    count: number;
    showText?: boolean;
}
export const UserCounter: FC<UserCounterProps> = (props) => {
    const { className, count = 100, showText = true } = props;
    return (
        <div className={cn(styles.UserCounter, className)}>
            {showText && <span className={styles.text}>Online:</span>}
            <div className={styles.counter}>
                <PlayerIcon />
                <span className={styles.count}>{count}</span>
            </div>
        </div>
    );
};
