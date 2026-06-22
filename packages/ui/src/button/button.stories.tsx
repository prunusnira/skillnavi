import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonStandard } from './ButtonStandard';
import { fn } from 'storybook/test';

const meta: Meta<typeof ButtonStandard> = {
    title: 'Button/ButtonStandard',
    component: ButtonStandard,
    tags: ['autodocs'],
    args: {
        text: '버튼',
        onClick: fn(),
    },
    argTypes: {
        size: {
            control: 'number',
        },
        customButtonClass: {
            control: 'text',
        },
        customTextClass: {
            control: 'text',
        },
        customSelectedClass: {
            control: 'text',
        },
        customDisabledClass: {
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ButtonStandard>;

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

export const WithIcon: Story = {
    args: {
        text: '아이콘',
        iconUrl:
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%236366f1"/></svg>',
        size: 20,
    },
};
