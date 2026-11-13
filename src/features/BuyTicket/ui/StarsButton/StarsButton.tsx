import StarIcon from '@/shared/assets/icons/star.svg?react';
import { useCreateOrder } from '@/shared/lib/hooks/useCreateOrder';
import { Button } from '@/shared/ui/Button/Button';
import { HStack } from '@/shared/ui/Stack';
import { openTelegramLink } from '@telegram-apps/sdk-react';
import cn from 'classnames';
import { FC } from 'react';
import styles from './StarsButton.module.scss';

interface StarsButtonProps {
    className?: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}
export const StarsButton: FC<StarsButtonProps> = (props) => {
    const { className, onError, onSuccess } = props;

    // Используем новый хук для создания заказа
    const { createOrder, isLoading } = useCreateOrder({
        // onSuccess,
        onError,
    });

    // Обработчик клика по кнопке
    const handleClick = async () => {
        const result = await createOrder('STARS');

        if (result) {
            const { invoiceLink } = result;
            if (invoiceLink && openTelegramLink.isAvailable()) {
                openTelegramLink(invoiceLink);
                // TODO: добавить обработку что бы трекать успешность транзакции и вызывать onSuccess?.();
                onSuccess?.();
            }
        }
    };

    return (
        <Button
            theme="secondary"
            className={cn(styles.StarsButton, className)}
            onClick={handleClick}
            disabled={isLoading}
            maxWidth
        >
            {isLoading ? (
                'Processing...'
            ) : (
                <HStack gap="8">
                    <StarIcon width={24} height={24} /> Telegram stars
                </HStack>
            )}
        </Button>
    );
};
