import { getIsTechnicalErrorModalOpen, userActions } from '@/entities/User';
import TicketIcon from '@/shared/assets/icons/ticket.svg?react';
import { getRouteMeetingsMenu } from '@/shared/config/routerConfig/routerConfig';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button } from '@/shared/ui/Button/Button';
import { Link } from '@/shared/ui/Link/Link';
import { Modal } from '@/shared/ui/Modal/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import cn from 'classnames';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TechnicalErrorModal.module.scss';

interface TechnicalErrorModalProps {
    className?: string;
}
export const TechnicalErrorModal: FC<TechnicalErrorModalProps> = (props) => {
    const { className } = props;
    const navigate = useNavigate();
    const isOpen = useAppSelector(getIsTechnicalErrorModalOpen);
    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(userActions.setIsTechnicalErrorModalOpen(false));
    };

    const onClickHomeScreen = () => {
        onClose();
        navigate(getRouteMeetingsMenu());
    };

    const joinChannelHandler = () => {
        onClose();
        window.open('https://t.me/telegram', '_blank');
    };

    return (
        <Modal isOpen={isOpen} onClose={() => {}} isShowCloseButton={false}>
            <VStack max gap="24" className={cn(styles.TechnicalErrorModal, className)}>
                <VStack align="center" max gap="8">
                    <h2 className={styles.title}>Technical error</h2>
                    <p className={styles.price}>Your payment will be refunded within 24 hours</p>
                </VStack>
                <VStack align="center" max gap="24">
                    <HStack align="center" className={styles.ticketContainer} gap="16">
                        <span className={styles.ticketIcon}>
                            <TicketIcon width={48} height={48} />
                        </span>
                        <p className={styles.ticketText}>As an apology, you&apos;ll receive a bonus ticket</p>
                    </HStack>
                    <p className={styles.aditionalText}>Don&apos;t miss updates</p>
                </VStack>

                <VStack gap="8" max>
                    {/* TODO: add group link */}
                    <Link maxWidth theme="clear" to="#" target="_blank">
                        <Button maxWidth theme="secondary" onClick={joinChannelHandler}>
                            Join channel
                        </Button>
                    </Link>
                    <Button maxWidth theme="secondary-inverted" onClick={onClickHomeScreen}>
                        Home screen
                    </Button>
                </VStack>
            </VStack>
        </Modal>
    );
};
