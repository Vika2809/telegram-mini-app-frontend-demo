import { UserCounter } from '@/features/UserCounter';
import { getRouteMeeting } from '@/shared/config/routerConfig/routerConfig';
import { Button } from '@/shared/ui/Button/Button';
import { HStack, VStack } from '@/shared/ui/Stack';
import { TimeChip } from '@/shared/ui/TimeChip/TimeChip';
import cn from 'classnames';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMeetingResponse } from '../../model/types/MeetingSchema';
import styles from './MeetingCard.module.scss';

interface MeetingCardProps {
    className?: string;
    meeting: IMeetingResponse;
}
export const MeetingCard: FC<MeetingCardProps> = (props) => {
    const { className, meeting } = props;
    const navigate = useNavigate();
    console.log(meeting);
    return (
        <div className={cn(styles.MeetingCard, className)}>
            <img src={meeting.thumb} alt="meeting" className={styles.image} />
            <HStack justify="between" align="center" className={styles.header}>
                <TimeChip time={meeting.startTime} />
                <UserCounter showText={false} count={meeting.participants} />
            </HStack>
            <VStack className={styles.content} gap="16">
                <HStack max justify="between" align="center">
                    <div className={styles.mainInfo}>
                        <span className={styles.location}>{meeting.location}</span>
                        <span className={styles.prize}>R {meeting.prize}</span>
                    </div>
                    <Button theme="secondary" onClick={() => navigate(getRouteMeeting(meeting.uniqueId))}>
                        Join
                    </Button>
                </HStack>
                <div className={styles.info}>
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>Distance:</p>
                        <p className={styles.infoItemValue}>{meeting.distance}</p>
                    </div>
                    <span className={styles.infoSeparator} />
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>Races:</p>
                        <p className={styles.infoItemValue}>{meeting.races.length}</p>
                    </div>
                    <span className={styles.infoSeparator} />
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>Type:</p>
                        <p className={styles.infoItemValue}>{meeting.races[0].type}</p>
                    </div>
                    <span className={styles.infoSeparator} />
                    <div className={styles.infoItem}>
                        <p className={styles.infoItemTitle}>Entry price:</p>
                        <p className={styles.infoItemValue}>R {meeting.ticketPrice}</p>
                    </div>
                </div>
            </VStack>
        </div>
    );
};
