import type { Meta, StoryObj } from '@storybook/react';
import { PlayerIcon } from './PlayerIcon';

const meta: Meta<typeof PlayerIcon> = {
    title: 'Shared/PlayerIcon',
    component: PlayerIcon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['pink', 'blue', 'turquoise', 'yellow', 'red', 'brown'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof PlayerIcon>;

export const Pink: Story = {
    args: {
        color: 'pink',
    },
};

export const Blue: Story = {
    args: {
        color: 'blue',
    },
};

export const Turquoise: Story = {
    args: {
        color: 'turquoise',
    },
};

export const Yellow: Story = {
    args: {
        color: 'yellow',
    },
};

export const Red: Story = {
    args: {
        color: 'red',
    },
};

export const Brown: Story = {
    args: {
        color: 'brown',
    },
};
