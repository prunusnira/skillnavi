import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SkillColor from './SkillColor';

describe('SkillColor', () => {
    it('value를 소수점 2자리로 표시한다', () => {
        // Given
        const value = 1234.567;

        // When
        render(<SkillColor value={value} />);

        // Then
        expect(screen.getByText('1234.57')).toBeInTheDocument();
    });

    it('낮은 스킬 값(1000 미만)에는 skill-0 클래스를 적용한다', () => {
        // Given
        const value = 500;

        // When
        render(<SkillColor value={value} />);

        // Then
        const el = screen.getByText('500.00');
        expect(el.className).toContain('skill-0');
    });

    it('높은 스킬 값(9500 이상)에는 skill-9500 클래스를 적용한다', () => {
        // Given
        const value = 9700;

        // When
        render(<SkillColor value={value} />);

        // Then
        const el = screen.getByText('9700.00');
        expect(el.className).toContain('skill-9500');
    });

    it('multiplier를 곱한 값 기준으로 색상 클래스를 적용한다', () => {
        // Given
        const value = 1000;
        const multiplier = 2;

        // When
        render(
            <SkillColor
                value={value}
                multiplier={multiplier}
            />,
        );

        // Then
        const el = screen.getByText('1000.00');
        // 1000 * 2 = 2000 → skill-2000
        expect(el.className).toContain('skill-2000');
    });

    it('onClick을 전달하면 클릭 시 호출된다', () => {
        // Given
        const onClick = vi.fn();
        render(
            <SkillColor
                value={500}
                onClick={onClick}
            />,
        );

        // When
        fireEvent.click(screen.getByText('500.00'));

        // Then
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
