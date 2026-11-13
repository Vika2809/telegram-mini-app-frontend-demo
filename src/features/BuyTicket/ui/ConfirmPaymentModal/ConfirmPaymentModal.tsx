import { Modal } from '@/shared/ui/Modal/Modal';
import { VStack } from '@/shared/ui/Stack';
import cn from 'classnames';
import { FC } from 'react';
import { StarsButton } from '../StarsButton/StarsButton';
import { TonButton } from '../TonButton/TonButton';
import styles from './ConfirmPaymentModal.module.scss';

interface ConfirmPaymentModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    ticketPrice: number;
}
export const ConfirmPaymentModal: FC<ConfirmPaymentModalProps> = (props) => {
    const { className, isOpen, onClose, ticketPrice } = props;

    // TODO: add logic
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <VStack max gap="36" className={cn(styles.ConfirmPaymentModal, className)}>
                <VStack align="center" max gap="8">
                    <h2 className={styles.title}>Confirm Entry & Payment</h2>
                    <p className={styles.price}>
                        Entry cost: <span>R {ticketPrice}</span>
                    </p>
                </VStack>

                <VStack gap="8" max>
                    <TonButton onSuccess={onClose} />
                    <StarsButton onSuccess={onClose} />
                </VStack>
            </VStack>
        </Modal>
    );
};
