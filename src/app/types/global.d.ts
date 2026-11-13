declare const __IS_DEV__: boolean;
declare const __LOCAL_TELEGRAM_ID__: string;
declare const __IS_STORYBOOK__: boolean;
declare const __API__: string;
declare const __TMA_URL__: string;

/// <reference path="./telegram-webapp.d.ts" />

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}
