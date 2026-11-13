import { openLink } from '@telegram-apps/sdk-react';
import cn from 'classnames';
import { FC, MouseEventHandler, useCallback } from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router-dom';
import styles from './Link.module.scss';

export type LinkTheme = 'primary' | 'clear';

interface LinkProps extends RouterLinkProps {
    theme?: LinkTheme;
    maxWidth?: boolean;
}

export const Link: FC<LinkProps> = (props) => {
    const { className, onClick: propsOnClick, to, theme = 'primary', maxWidth, ...otherProps } = props;

    const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
        (e) => {
            propsOnClick?.(e);

            // Compute if target path is external. In this case we would like to open
            // link using TMA method.
            let path: string;
            if (typeof to === 'string') {
                path = to;
            } else {
                const { search = '', pathname = '', hash = '' } = to;
                path = `${pathname}?${search}#${hash}`;
            }

            const targetUrl = new URL(path, window.location.toString());
            const currentUrl = new URL(window.location.toString());
            const isExternal = targetUrl.protocol !== currentUrl.protocol || targetUrl.host !== currentUrl.host;

            if (isExternal) {
                e.preventDefault();
                openLink(targetUrl.toString());
            }
        },
        [to, propsOnClick],
    );
    return (
        <RouterLink
            {...otherProps}
            className={cn(styles.Link, className, styles[theme], { [styles.maxWidth]: maxWidth })}
            onClick={onClick}
            to={to}
        />
    );
};
