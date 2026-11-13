import { useGetMeetingById } from '@/entities/Meeting';
import { BuyTicket } from '@/features/BuyTicket';
import { Link } from '@/shared/ui/Link/Link';
import { List } from '@/shared/ui/List/List';
import { Page } from '@/shared/ui/Page/Page';
import { HStack, VStack } from '@/shared/ui/Stack';
import { RaceAccordion } from '@/widgets/RaceAccordion';
import cn from 'classnames';
import { FC, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MeetingHeader } from '../MeetingHeader/MeetingHeader';
import styles from './MeetingPage.module.scss';

interface MeetingPageProps {
    className?: string;
}
const MeetingPage: FC<MeetingPageProps> = (props) => {
    const { className } = props;
    const { uniqueId } = useParams();
    const { data, isLoading } = useGetMeetingById({ uniqueId: uniqueId as string });

    const prizePools = useMemo(
        () => [
            { text: 'x6 correct', supplement: 'R 180000' },
            { text: 'x5 correct', supplement: 'R 89000' },
            { text: 'x4 correct', supplement: 'R 45000' },
        ],
        [],
    );

    const howToParticipate = useMemo(
        () => [
            { text: `Buy a ticket for R${data?.data.ticketPrice}` },
            { text: `Pick winners for 6 races` },
            { text: `Submit your selections before the deadlines` },
            { text: `Win prizes if you pick correctly` },
        ],
        [data],
    );

    const getContent = useCallback(() => {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        if (!data || !uniqueId) {
            return <div>No data</div>;
        }
        return (
            <div>
                <VStack gap="8">
                    <MeetingHeader img={data.data.thumb} meeting={data.data} />
                    <p className={styles.description}>
                        Pick your horses to win the 6 races and win prizes for correct guesses
                    </p>
                </VStack>
                <HStack gap="8" className={styles.buttons}>
                    <BuyTicket ticketPrice={Number(data.data.ticketPrice)} />
                    <RaceAccordion meeting={data.data} />
                </HStack>
                <VStack gap="36">
                    <VStack gap="16" max>
                        <HStack max justify="between" gap="8">
                            <p className={styles.title}>Prize Pools:</p>
                            {/* TODO: указать ссылку на  T&Cs applied*/}
                            <Link className={styles.note} to="/">
                                T&Cs applied
                            </Link>
                        </HStack>
                        <List data={prizePools} variant="horse" />
                    </VStack>
                    <VStack gap="16" max>
                        <p className={styles.title}>How to Participate:</p>
                        <List data={howToParticipate} variant="number" />
                    </VStack>
                </VStack>
            </div>
        );
    }, [data, isLoading, uniqueId, howToParticipate, prizePools]);

    return (
        <Page padding="secondary" className={cn(styles.MeetingPage, className)}>
            {getContent()}
        </Page>
    );
};

export default MeetingPage;
