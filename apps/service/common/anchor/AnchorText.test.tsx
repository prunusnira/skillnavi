import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AnchorText from './AnchorText';

const { mockPush } = vi.hoisted(() => ({
    mockPush: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('AnchorText', () => {
    it('text를 표시한다', () => {
        // Given
        const text = '이동하기';

        // When
        render(
            <AnchorText
                text={text}
                path="/somewhere"
            />,
        );

        // Then
        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('클릭하면 router.push가 지정한 path로 호출된다', () => {
        // Given
        mockPush.mockClear();
        const text = '링크';
        const path = '/target/path';

        // When
        render(
            <AnchorText
                text={text}
                path={path}
            />,
        );
        fireEvent.click(screen.getByText(text));

        // Then
        expect(mockPush).toHaveBeenCalledWith(path);
    });
});
