import { Button } from '@/shared/ui/Button/Button';
import cn from 'classnames';
import { FC, useCallback, useState } from 'react';
import { ConfirmPaymentModal } from '../ConfirmPaymentModal/ConfirmPaymentModal';
import { TechnicalErrorModal } from '../TechnicalErrorModal/TechnicalErrorModal';

interface BuyTicketProps {
    className?: string;
    ticketPrice: number;
}
export const BuyTicket: FC<BuyTicketProps> = (props) => {
    const { className, ticketPrice } = props;
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = useCallback(() => {
        setIsOpenModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpenModal(false);
    }, []);

    return (
        <div className={cn(className)}>
            <Button theme="secondary" onClick={openModal}>
                Buy a ticket for R{ticketPrice}
            </Button>
            <ConfirmPaymentModal isOpen={isOpenModal} onClose={closeModal} ticketPrice={ticketPrice} />
            <TechnicalErrorModal />
        </div>
    );
};
