import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Loading from './Loading';

vi.mock('@lottiefiles/dotlottie-react', () => ({
    DotLottieReact: () => <div data-testid="lottie" />,
}));

describe('Loading', () => {
    it('로티 애니메이션을 렌더링한다', () => {
        // Given / When
        render(<Loading />);

        // Then
        expect(screen.getByTestId('lottie')).toBeInTheDocument();
    });
});
