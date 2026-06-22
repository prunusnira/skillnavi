import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import InputFormItem from './InputFormItem';

describe('InputFormItem', () => {
    it('label과 input이 연결되어 있다', () => {
        // Given
        const onChange = vi.fn();

        // When
        render(
            <InputFormItem
                label="이름"
                placeholder="이름 입력"
                id="name"
                type="text"
                value=""
                onChange={onChange}
            />,
        );

        // Then
        const input = screen.getByLabelText('이름');
        expect(input).toHaveAttribute('id', 'name');
        expect(input).toHaveAttribute('placeholder', '이름 입력');
        expect(input).toHaveAttribute('type', 'text');
    });

    it('value가 input에 반영된다', () => {
        // Given
        const onChange = vi.fn();

        // When
        render(
            <InputFormItem
                label="이메일"
                placeholder=""
                id="email"
                type="email"
                value="test@example.com"
                onChange={onChange}
            />,
        );

        // Then
        expect(screen.getByLabelText('이메일')).toHaveValue('test@example.com');
    });

    it('사용자 입력 시 onChange가 호출된다', async () => {
        // Given
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
            <InputFormItem
                label="메모"
                placeholder=""
                id="memo"
                type="text"
                value=""
                onChange={onChange}
            />,
        );

        // When
        await user.type(screen.getByLabelText('메모'), 'a');

        // Then
        expect(onChange).toHaveBeenCalled();
    });
});
