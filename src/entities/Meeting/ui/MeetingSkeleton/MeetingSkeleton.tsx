import { FC } from 'react';
import styles from './MeetingSkeleton.module.scss';

export const MeetingSkeleton: FC = () => {
    return (
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonHeader}>
                <div className={styles.skeletonHeaderLeft} />
                <div className={styles.skeletonHeaderRight} />
            </div>

            <div className={styles.skeletonContent}>
                <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
                <div className={`${styles.skeletonLine} ${styles.skeletonLineLong}`} />
                <div className={styles.skeletonCircle} />
            </div>

            <div className={styles.skeletonFooter}>
                <div className={styles.skeletonFooterItem}>
                    <div className={styles.skeletonFooterItemLabel} />
                    <div className={styles.skeletonFooterItemText} />
                </div>
                <div className={styles.skeletonFooterItem}>
                    <div className={styles.skeletonFooterItemLabel} />
                    <div className={styles.skeletonFooterItemText} />
                </div>
                <div className={styles.skeletonFooterItem}>
                    <div className={styles.skeletonFooterItemLabel} />
                    <div className={styles.skeletonFooterItemText} />
                </div>
                <div className={styles.skeletonFooterItem}>
                    <div className={styles.skeletonFooterItemLabel} />
                    <div className={styles.skeletonFooterItemText} />
                </div>
            </div>
        </div>
    );
};
