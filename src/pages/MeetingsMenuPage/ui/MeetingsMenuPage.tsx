import { MeetingList } from '@/entities/Meeting';
import { UserCounter } from '@/features/UserCounter';
import AddFriendIcon from '@/shared/assets/icons/add-friend.svg?react';
import { Button } from '@/shared/ui/Button/Button';
import { Page } from '@/shared/ui/Page/Page';
import { HStack } from '@/shared/ui/Stack';
import cn from 'classnames';
import { FC, useCallback } from 'react';
import styles from './MeetingsMenuPage.module.scss';
import { Onboarding } from '@/features/Onboarding/index';

interface MeetingsMenuPageProps {
    className?: string;
}

const MeetingsMenuPage: FC<MeetingsMenuPageProps> = (props) => {
    const { className } = props;

    const getFaceOnline = useCallback(() => {
        return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    }, []);

    const handleShareApp = useCallback(() => {
        const shareText = 'Join our racing community!';
        const encodedUrl = encodeURIComponent(__TMA_URL__);
        const encodedText = encodeURIComponent(shareText);
        window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, '_blank');
    }, []);

    return (
        <Page back={false} className={cn(styles.MeetingsMenuPage, className)}>
            <header className={styles.header}>
                <h1 className={styles.title}>Meetings</h1>
                <UserCounter count={getFaceOnline()} />
            </header>
            <main className={styles.main}>
                <Onboarding />
                <MeetingList />
                <HStack gap="8" className={styles.buttons}>
                    <Button
                        maxWidth
                        theme="secondary-inverted"
                        onClick={() => {
                            window.open('https://t.me/telegram', '_blank');
                        }}
                    >
                        Join channel
                    </Button>
                    <Button className={styles.community_invite} theme="secondary-inverted" onClick={handleShareApp}>
                        <AddFriendIcon width={24} height={24} />
                    </Button>
                </HStack>
            </main>
        </Page>
    );
};

export default MeetingsMenuPage;
