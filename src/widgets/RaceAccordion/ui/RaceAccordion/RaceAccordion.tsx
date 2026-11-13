import { IMeetingResponse } from '@/entities/Meeting';
import { Button } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { VStack } from '@/shared/ui/Stack';
import cn from 'classnames';
import { FC, useState } from 'react';
import { RaceList } from '../RaceList/RaceList';
import styles from './RaceAccordion.module.scss';

interface RaceAccordionProps {
    className?: string;
    meeting: IMeetingResponse;
}
export const RaceAccordion: FC<RaceAccordionProps> = (props) => {
    const { className, meeting } = props;
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenDrawer = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div className={cn(styles.RaceAccordion, className)}>
            <Button maxWidth theme="secondary-inverted" onClick={handleOpenDrawer}>
                About
            </Button>
            <Drawer
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                title="Race Details"
                description="Detailed information about the selected race."
            >
                <VStack className={styles.container} align="center" gap="8" max>
                    <VStack justify="end" className={styles.content} gap="16" max>
                        <div>
                            <div className={styles.handle} />
                            <svg
                                className={styles.separator}
                                xmlns="http://www.w3.org/2000/svg"
                                width="116"
                                height="30"
                                viewBox="0 0 116 30"
                                fill="none"
                            >
                                <path
                                    d="M116 0C109.373 4.83208e-08 104 5.37258 104 12V18C104 24.6274 98.6274 30 92 30H24C17.3726 30 12 24.6274 12 18V12C12 5.37258 6.62742 9.66386e-07 0 0H116Z"
                                    fill="#1B1B1B"
                                />
                            </svg>
                        </div>

                        <p className={styles.location}>{meeting.location}</p>
                        <div className={styles.info}>
                            <div className={styles.infoItem}>
                                <p className={styles.infoItemTitle}>Distance:</p>
                                <p className={styles.infoItemValue}>{meeting.distance}</p>
                            </div>
                            <span className={styles.infoSeparator} />
                            <div className={styles.infoItem}>
                                <p className={styles.infoItemTitle}>Races:</p>
                                <p className={styles.infoItemValue}>{meeting.races.length}</p>
                            </div>
                            <span className={styles.infoSeparator} />
                            <div className={styles.infoItem}>
                                <p className={styles.infoItemTitle}>Type:</p>
                                <p className={styles.infoItemValue}>{meeting.races[0].type}</p>
                            </div>
                            <span className={styles.infoSeparator} />
                            <div className={styles.infoItem}>
                                <p className={styles.infoItemTitle}>Entry price:</p>
                                <p className={styles.infoItemValue}>R {meeting.ticketPrice}</p>
                            </div>
                        </div>
                    </VStack>
                    <RaceList races={meeting.races} />
                </VStack>
            </Drawer>
        </div>
    );
};
