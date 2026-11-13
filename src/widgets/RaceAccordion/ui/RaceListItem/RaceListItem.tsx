import { IRace } from '@/entities/Meeting';
import ArrowDownIcon from '@/shared/assets/icons/down.svg?react';
import { formatDate } from '@/shared/lib/components/formatDate/formatDate';
import { HStack, VStack } from '@/shared/ui/Stack';
import cn from 'classnames';
import { FC, useState } from 'react';
import styles from './RaceListItem.module.scss';

interface RaceListItemProps {
    className?: string;
    race: IRace;
    index: number;
}
export const RaceListItem: FC<RaceListItemProps> = (props) => {
    const { className, race, index } = props;
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={cn(styles.RaceListItem, className)}>
            <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                <VStack gap="8">
                    <HStack gap="8">
                        <p className={styles.title}>Race {index + 1}</p>
                        {/* TODO: Обработать все состояния */}
                        <HStack gap="4" className={styles.status}>
                            <span className={styles.statusIcon} />
                            <p className={styles.statusText}>{race.status.toLowerCase()}</p>
                        </HStack>
                    </HStack>

                    <p className={styles.additionalText}>Time off - {formatDate(race.timeoff, 'timeoff')}</p>
                </VStack>
                <ArrowDownIcon width={24} height={24} className={isOpen ? styles.open : styles.close} />
            </button>
            <VStack max gap="16" className={cn(styles.content, { [styles.contentOpen]: isOpen })}>
                <VStack max gap="4">
                    <p className={styles.additionalText}>Race name:</p>
                    <p className={styles.contentItemValue}>{race.name}</p>
                </VStack>
                <VStack max gap="4">
                    <p className={styles.additionalText}>Description:</p>
                    <p className={styles.contentItemValue}>{race.desc}</p>
                </VStack>
                <HStack gap="16">
                    <VStack max gap="4">
                        <p className={styles.additionalText}>Distance:</p>
                        <p className={styles.contentItemValue}>{race.distance}</p>
                    </VStack>
                    <VStack max gap="4">
                        <p className={styles.additionalText}>Grade:</p>
                        <p className={styles.contentItemValue}>{race.grade}</p>
                    </VStack>
                </HStack>
            </VStack>
        </div>
    );
};
