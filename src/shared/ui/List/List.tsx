import cn from 'classnames';
import { FC, Fragment } from 'react';
import { HStack } from '../Stack';
import styles from './List.module.scss';

export type ListVariant = 'number' | 'horse';

const HorseIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.3889 14.5196L19.9713 15.376L22.0376 11.9007L24.9183 11.9924L26.5316 18.2777L25.3662 18.7544L23.3889 14.5196ZM21.32 5.32209L21.155 11.1779L18.9578 14.6401L18.6513 23.9921H17.5174L16.3101 15.3865L9.40405 15.4703L6.3609 18.2175L5.87641 23.8822L4.41769 23.9293L4.10866 16.9028L6.1802 12.359L6.20377 8.51713C5.11955 7.91741 3.46441 7.99336 3.46441 12.9038L0.180327 13.6894C-1.14483 5.57089 5.19812 5.13353 7.30894 7.42768L14.2621 7.51672C14.2621 4.55476 17.3759 -2.49791 25.2824 0.909264L25.7616 8.24215L23.766 8.95449L21.32 5.32209ZM13.7828 16.4602L10.9832 18.3484L11.9339 23.8141L10.5276 24L8.48482 17.8168L9.27049 16.5545L13.7828 16.4602Z"
                fill="#5CBE09"
            />
        </svg>
    );
};

const NumberIcon = ({ number }: { number: number }) => {
    return <div className={styles.NumberIcon}>{number}</div>;
};

const ListItem = (props: ListItemProps) => {
    const { text, supplement, variant, number } = props;
    return (
        <HStack gap="8" max align="start">
            {variant === 'number' ? <NumberIcon number={number ?? 0} /> : <HorseIcon />}
            <HStack justify="between" align="center" max>
                <p className={styles.ListItemText}>{text}</p>
                <p className={styles.ListItemSupplement}>{supplement}</p>
            </HStack>
        </HStack>
    );
};

interface ListItemProps {
    text: string;
    supplement?: string;
    variant?: ListVariant;
    number?: number;
}

interface ListProps {
    className?: string;
    variant?: ListVariant;
    data: ListItemProps[];
}
export const List: FC<ListProps> = (props) => {
    const { className, variant = 'number', data } = props;
    return (
        <div className={cn(styles.List, className)}>
            {data.map((item, index) => (
                <Fragment key={index}>
                    <ListItem {...item} variant={variant} number={index + 1} />
                    {index !== data.length - 1 && <div className={styles.ListItemSeparator} />}
                </Fragment>
            ))}
        </div>
    );
};
