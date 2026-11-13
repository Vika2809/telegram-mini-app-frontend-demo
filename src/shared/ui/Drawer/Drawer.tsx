import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import cn from 'classnames';
import { FC, ReactNode } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import styles from './Drawer.module.scss';

interface DrawerProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    title?: string;
    description?: string;
}

export const Drawer: FC<DrawerProps> = (props) => {
    const { children, isOpen, onClose, className, title, description } = props;

    const titleContent = title && (
        <DrawerPrimitive.Title>
            <VisuallyHidden>{title}</VisuallyHidden>
        </DrawerPrimitive.Title>
    );

    const descriptionContent = description && (
        <DrawerPrimitive.Description>
            <VisuallyHidden>{description}</VisuallyHidden>
        </DrawerPrimitive.Description>
    );

    return (
        <DrawerPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DrawerPrimitive.Portal>
                <DrawerPrimitive.Overlay className={styles.overlay} />
                <DrawerPrimitive.Content className={cn(styles.content, className)}>
                    {titleContent}
                    {descriptionContent}

                    {children}
                </DrawerPrimitive.Content>
            </DrawerPrimitive.Portal>
        </DrawerPrimitive.Root>
    );
};
