import { StarsButton, TonButton } from '@/features/BuyTicket';
import cn from 'classnames';
import cls from './WalletActions.module.scss';

interface WalletActionsProps {
    onDisconnect: () => void;
    className?: string;
}

export const WalletActions = ({ onDisconnect, className }: WalletActionsProps) => {
    return (
        <div className={cn(cls.container, className)}>
            {/* Заголовок секции */}
            <div className={cls.header}>
                <h2 className={cls.title}>Покупка билетов</h2>
                <p className={cls.subtitle}>Выберите способ оплаты для покупки билета</p>
            </div>

            {/* Контейнер для кнопок оплаты */}
            <div className={cls.paymentContainer}>
                <div>
                    {/* TON кнопка */}
                    <div className={cls.paymentGroup}>
                        <TonButton
                            onSuccess={() => alert('Транзакция успешна!')}
                            onError={(error) => console.error('Ошибка транзакции:', error)}
                            className={cn(cls.paymentButton, cls.tonButton)}
                        />
                        <p className={cls.paymentDescription}>Оплата через TON кошелёк</p>
                    </div>

                    {/* Разделитель */}
                    <div className={cls.divider}>
                        <div className={cls.dividerText}>
                            <span>или</span>
                        </div>
                    </div>

                    {/* Stars кнопка */}
                    <div className={cls.paymentGroup}>
                        <StarsButton
                            // onSuccess={() => alert('Транзакция успешна!')}
                            onError={(error) => console.error('Ошибка транзакции:', error)}
                            className={cn(cls.paymentButton, cls.starsButton)}
                        />
                        <p className={cls.paymentDescription}>Оплата через Telegram Stars</p>
                    </div>
                </div>
            </div>

            {/* Кнопка отключения кошелька */}
            <div className={cls.disconnectSection}>
                <button onClick={onDisconnect} className={cls.disconnectButton}>
                    <div className={cls.disconnectIcon}>
                        <svg viewBox="0 0 24 24">
                            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    Отключить кошелёк
                </button>
            </div>
        </div>
    );
};
