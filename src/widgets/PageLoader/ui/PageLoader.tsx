import { Loader } from '@/shared/ui/Loader/Loader';
import { Page } from '@/shared/ui/Page/Page';
import { VStack } from '@/shared/ui/Stack';
import cn from 'classnames';
import { FC } from 'react';
import styles from './PageLoader.module.scss';
interface PageLoaderProps {
    className?: string;
}

export const PageLoader: FC<PageLoaderProps> = (props) => {
    const { className } = props;
    return (
        <Page className={cn(styles.PageLoader, className)}>
            <VStack gap="16">
                <h1 className={styles.title}>
                    Race<span>6</span> <br /> Demo
                    <br /> Racing
                </h1>
                <Loader />
            </VStack>
        </Page>
    );
};
