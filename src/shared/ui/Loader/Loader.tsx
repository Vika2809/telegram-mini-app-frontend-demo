import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

// Компонент одной лошади
const HorseIcon: FC<{ isActive: boolean }> = ({ isActive }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="30" viewBox="0 0 34 30" fill="none">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.2361 18.1495L24.9641 19.22L27.547 14.8759L31.1479 14.9905L33.1645 22.8472L31.7077 23.443L29.2361 18.1495ZM26.65 6.65261L26.4438 13.9724L23.6972 18.3001L23.3142 29.9902H21.8967L20.3876 19.2331L11.7551 19.3379L7.95113 22.7719L7.34551 29.8527L5.52211 29.9116L5.13582 21.1285L7.72525 15.4488L7.75471 10.6464C6.39944 9.89676 4.33052 9.9917 4.33052 16.1297L0.225409 17.1118C-1.43104 6.96361 6.49765 6.41691 9.13618 9.2846L17.8276 9.3959C17.8276 5.69345 21.7199 -3.12239 31.603 1.13658L32.202 10.3027L29.7075 11.1931L26.65 6.65261ZM17.2285 20.5753L13.7291 22.9356L14.9174 29.7676L13.1594 30L10.606 22.271L11.5881 20.6931L17.2285 20.5753Z"
            fill={isActive ? '#5CBE09' : 'white'}
            fillOpacity={isActive ? '1' : '0.2'}
            className={isActive ? styles.activeHorse : styles.inactiveHorse}
        />
    </svg>
);

export const Loader: FC<LoaderProps> = (props) => {
    const { className } = props;
    const [currentHorse, setCurrentHorse] = useState(0);
    const totalHorses = 6;
    const horseDuration = 500; // 3 секунды на каждую лошадь

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHorse((prev) => {
                if (prev < totalHorses - 1) {
                    return prev + 1;
                }
                // Сбрасываем анимацию и начинаем заново
                return 0;
            });
        }, horseDuration);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={cn(styles.Loader, className)}>
            {Array.from({ length: totalHorses }, (_, index) => (
                <HorseIcon key={index} isActive={index <= currentHorse} />
            ))}
        </div>
    );
};
