import type { Meta, StoryObj } from '@storybook/react';
import { TimeChip } from './TimeChip';

const meta: Meta<typeof TimeChip> = {
    title: 'Shared/TimeChip',
    component: TimeChip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        time: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof TimeChip>;

export const Primary: Story = {
    args: {
        time: '2025-06-27T10:00:00.000Z',
    },
};

export const PrimaryWithNotValidTime: Story = {
    args: {
        time: '',
    },
};
