import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import type { Meta, StoryObj } from '@storybook/react';
import MainPage from './MainPage';

const meta = {
    title: 'pages/MainPage',
    component: MainPage,
    parameters: {
        layout: 'fullscreen',
        // Отключаем автоматические импорты для избежания проблем с RTK Query
        docs: {
            inlineStories: false,
        },
    },
    tags: ['autodocs'],
    decorators: [
        StoreDecorator({
            user: {
                // Базовое состояние пользователя для избежания ошибок
                authData: undefined,
                _initialized: true,
                isLoginModalOpen: false,
                isLoading: false,
                error: undefined,
            },
        }),
    ],
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Основной вариант главной страницы
export const Default: Story = {
    args: {},
};

// Вариант с кастомным классом
export const WithCustomClass: Story = {
    args: {
        className: 'custom-main-page',
    },
};
