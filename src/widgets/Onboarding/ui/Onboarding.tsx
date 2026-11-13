import cn from 'classnames';
import { FC, useState } from 'react';
import styles from './Onboarding.module.scss';
import { useAppSelector } from '@/shared/lib';
import { getUserSettings } from '@/entities/User';
import { Drawer } from '@/shared/ui/Drawer';

interface OnboardingProps {
    className?: string;
}
export const Onboarding: FC<OnboardingProps> = (props) => {
    const { className } = props;
    const settings = useAppSelector(getUserSettings);
    const [isOpen, setIsOpen] = useState(false);
    console.log(settings);
    // TODO: add logic
    return (
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className={cn(styles.Onboarding, className)}>Onboarding</div>
        </Drawer>
    );
};
