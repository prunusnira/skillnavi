import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonRounded } from './ButtonRounded';
import { fn } from 'storybook/test';

const meta: Meta<typeof ButtonRounded> = {
    title: 'Button/ButtonRounded',
    component: ButtonRounded,
    tags: ['autodocs'],
    args: {
        text: '버튼',
        onClick: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof ButtonRounded>;

export const Default: Story = {};

export const Selected: Story = {
    args: {
        text: '선택됨',
        isSelected: true,
    },
};

export const Disabled: Story = {
    args: {
        text: '비활성',
        disabled: true,
    },
};
