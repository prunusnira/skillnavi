import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Toggle from './toggle';

describe('Toggle', () => {
    it('value가 true면 active 상태로 렌더링된다', () => {
        // Given
        const callback = vi.fn();

        // When
        render(
            <Toggle
                id="t1"
                value={true}
                callback={callback}
            />,
        );

        // Then
        const checkbox = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });

    it('체크박스를 변경하면 callback이 새 값으로 호출된다', () => {
        // Given
        const callback = vi.fn<(b: boolean) => void>();
        render(
            <Toggle
                id="t2"
                value={false}
                callback={callback}
            />,
        );

        // When
        fireEvent.click(screen.getByRole('checkbox', { hidden: true }));

        // Then
        expect(callback).toHaveBeenCalledWith(true);
    });

    it('isLoading이 true면 checkbox가 비활성화된다', () => {
        // Given
        const callback = vi.fn();

        // When
        render(
            <Toggle
                id="t3"
                value={false}
                isLoading={true}
                callback={callback}
            />,
        );

        // Then
        const checkbox = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement;
        expect(checkbox).toBeDisabled();
    });
});
