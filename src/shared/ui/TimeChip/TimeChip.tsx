import ClockIcon from '@/shared/assets/icons/timer.svg?react';
import { formatDate, TimeType } from '@/shared/lib/components/formatDate/formatDate';
import cn from 'classnames';
import { FC, useMemo } from 'react';
import styles from './TimeChip.module.scss';

interface TimeChipProps {
    className?: string;
    time: string;
    variant?: TimeType;
}
export const TimeChip: FC<TimeChipProps> = (props) => {
    const { className, time, variant = 'data' } = props;
    const formattedTime = useMemo(() => formatDate(time, variant), [time, variant]);
    return (
        <div className={cn(styles.TimeChip, className)}>
            <ClockIcon />
            {variant === 'time' && <span className={styles.time}>Starts in</span>}

            <span className={styles.time}>{formattedTime}</span>
        </div>
    );
};
