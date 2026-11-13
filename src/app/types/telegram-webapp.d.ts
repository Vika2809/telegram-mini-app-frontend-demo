declare global {
    interface Window {
        Telegram?: {
            WebApp: {
                ready(): void;
                close(): void;
                expand(): void;
                isExpanded: boolean;
                viewportHeight: number;
                viewportStableHeight: number;
                headerColor: string;
                backgroundColor: string;
                BackButton: {
                    isVisible: boolean;
                    onClick(callback: () => void): void;
                    show(): void;
                    hide(): void;
                };
                MainButton: {
                    text: string;
                    color: string;
                    textColor: string;
                    isVisible: boolean;
                    isProgressVisible: boolean;
                    isActive: boolean;
                    onClick(callback: () => void): void;
                    show(): void;
                    hide(): void;
                    enable(): void;
                    disable(): void;
                    showProgress(leaveActive?: boolean): void;
                    hideProgress(): void;
                };
                HapticFeedback: {
                    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
                    notificationOccurred(type: 'error' | 'success' | 'warning'): void;
                    selectionChanged(): void;
                };
                showPopup(
                    params: {
                        title?: string;
                        message: string;
                        buttons?: Array<{
                            type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
                            text: string;
                            id?: string;
                        }>;
                    },
                    callback?: (buttonId: string) => void,
                ): void;
                openTelegramLink(url: string): void;
                openLink(url: string, options?: { try_instant_view?: boolean }): void;
                switchInlineQuery(query: string, choose_chat_types?: string[]): void;
                sendData(data: string): void;
                initData: string;
                initDataUnsafe: {
                    query_id?: string;
                    user?: {
                        id: number;
                        is_bot?: boolean;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                        language_code?: string;
                        is_premium?: boolean;
                        added_to_attachment_menu?: boolean;
                        allows_write_to_pm?: boolean;
                        photo_url?: string;
                    };
                    receiver?: {
                        id: number;
                        is_bot?: boolean;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                        language_code?: string;
                        is_premium?: boolean;
                        added_to_attachment_menu?: boolean;
                        allows_write_to_pm?: boolean;
                        photo_url?: string;
                    };
                    chat?: {
                        id: number;
                        type: 'group' | 'supergroup' | 'channel';
                        title: string;
                        username?: string;
                        photo_url?: string;
                    };
                    chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
                    chat_instance?: string;
                    start_param?: string;
                    can_send_after?: number;
                    auth_date: number;
                    hash: string;
                };
                colorScheme: 'light' | 'dark';
                themeParams: {
                    bg_color?: string;
                    text_color?: string;
                    hint_color?: string;
                    link_color?: string;
                    button_color?: string;
                    button_text_color?: string;
                    secondary_bg_color?: string;
                };
                isClosingConfirmationEnabled: boolean;
                onEvent(eventType: string, eventHandler: () => void): void;
                offEvent(eventType: string, eventHandler: () => void): void;
            };
        };
    }
}

export {};
