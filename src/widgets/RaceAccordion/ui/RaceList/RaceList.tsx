import { IRace } from '@/entities/Meeting';
import cn from 'classnames';
import { FC } from 'react';
import { RaceListItem } from '../RaceListItem/RaceListItem';
import styles from './RaceList.module.scss';

interface RaceListProps {
    className?: string;
    races: IRace[];
}
export const RaceList: FC<RaceListProps> = (props) => {
    const { className, races } = props;
    return (
        <div className={cn(styles.RaceList, className)} data-vaul-no-drag>
            {races.length > 0 ? (
                races.map((race, index) => <RaceListItem key={race.id} index={index} race={race} />)
            ) : (
                <div>No races</div>
            )}
        </div>
    );
};
