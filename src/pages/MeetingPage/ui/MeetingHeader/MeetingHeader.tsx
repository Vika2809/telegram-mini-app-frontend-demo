import { IMeetingResponse } from '@/entities/Meeting/model/types/MeetingSchema';
import { UserCounter } from '@/features/UserCounter';
import { HStack, VStack } from '@/shared/ui/Stack';
import { TimeChip } from '@/shared/ui/TimeChip/TimeChip';
import cn from 'classnames';
import { FC } from 'react';
import styles from './MeetingHeader.module.scss';

interface MeetingHeaderProps {
    className?: string;
    img: string;
    meeting: IMeetingResponse;
}
export const MeetingHeader: FC<MeetingHeaderProps> = (props) => {
    const { className, img, meeting } = props;
    return (
        <div className={cn(styles.MeetingHeader, className)}>
            <img src={img} alt="meeting" className={styles.image} />
            <HStack justify="between" align="center" className={styles.header}>
                <TimeChip variant="time" time={meeting.startTime} />
                <UserCounter showText={false} count={meeting.participants} />
            </HStack>
            <VStack className={styles.content} gap="8">
                <p className={styles.location}>{meeting.location}</p>
                <p className={styles.prize}>
                    Pick 6 Challenge <br /> to win R {meeting.prize}
                </p>
            </VStack>
        </div>
    );
};
