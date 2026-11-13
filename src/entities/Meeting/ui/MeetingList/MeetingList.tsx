import { VStack } from '@/shared/ui/Stack';
import cn from 'classnames';
import { FC, useCallback } from 'react';
import { useGetMeetings } from '../../api/meeting.api';
import { MeetingCard } from '../MeetingCard/MeetingCard';
import { MeetingSkeleton } from '../MeetingSkeleton/MeetingSkeleton';

interface MeetingListProps {
    className?: string;
}
export const MeetingList: FC<MeetingListProps> = (props) => {
    const { className } = props;

    const today = new Date();
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(today.getDate() + 5);

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const from = formatDate(today);
    const to = formatDate(fiveDaysFromNow);
    console.log(from, to);
    const { data, isLoading } = useGetMeetings({ from, to });

    const getContent = useCallback(() => {
        if (isLoading) {
            return (
                <>
                    <MeetingSkeleton />
                    <MeetingSkeleton />
                    <MeetingSkeleton />
                    <MeetingSkeleton />
                </>
            );
        }
        if (!data) {
            return <div>No data</div>;
        }
        return data.data.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} />);
    }, [data, isLoading]);
    return (
        <VStack gap="8" className={cn(className)}>
            {getContent()}
        </VStack>
    );
};
