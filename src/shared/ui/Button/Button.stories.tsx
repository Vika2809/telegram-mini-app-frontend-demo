import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        theme: {
            control: 'select',
            options: ['primary', 'primary-selected', 'secondary'],
        },
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Кнопка',
        theme: 'primary',
    },
};

export const PrimarySelected: Story = {
    args: {
        children: 'Кнопка',
        theme: 'primary-selected',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Кнопка',
        theme: 'secondary',
    },
};

export const PrimaryDisabled: Story = {
    args: {
        children: 'Кнопка',
        disabled: true,
    },
};

export const SecondaryInverted: Story = {
    args: {
        children: 'Кнопка',
        theme: 'secondary-inverted',
    },
};
