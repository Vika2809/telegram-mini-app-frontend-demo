import cn from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.scss';
// import { ButtonTheme } from './types';

export type ButtonTheme = 'primary' | 'primary-selected' | 'secondary' | 'secondary-inverted';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonTheme;
    disabled?: boolean;
    maxWidth?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
    const { className, children, theme = 'primary', disabled, maxWidth, ...otherProps } = props;

    const mods: Record<string, boolean> = {
        [styles.button]: true,
        [styles[theme]]: true,
        [styles.disabled]: disabled ?? false,
        [styles.maxWidth]: maxWidth ?? false,
    };

    return (
        <button className={cn(styles.button, mods, className)} disabled={disabled} {...otherProps}>
            {children}
        </button>
    );
};
