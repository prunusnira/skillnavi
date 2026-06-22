import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AlbumArt from './AlbumArt';

vi.mock('next/image', () => ({
    __esModule: true,
    default: ({
        src,
        alt,
        onError,
    }: {
        src: string;
        alt: string;
        onError?: () => void;
    }) => (
        <img
            data-testid="album-img"
            src={src}
            alt={alt}
            onError={onError}
        />
    ),
}));

describe('AlbumArt', () => {
    it('mid로 앨범 아트 이미지를 렌더링한다', () => {
        // Given
        const mid = 123;

        // When
        render(<AlbumArt mid={mid} />);

        // Then
        const img = screen.getByTestId('album-img');
        expect(img).toHaveAttribute('alt', 'albumart');
        expect(img.getAttribute('src')).toContain(String(mid));
    });

    it('이미지 로드 실패 시 empty 이미지로 대체된다', () => {
        // Given
        const mid = 999;

        // When
        render(<AlbumArt mid={mid} />);
        const img = screen.getByTestId('album-img');

        // Then
        const initialSrc = img.getAttribute('src');
        expect(initialSrc).toContain(String(mid));

        // When - onError 트리거
        fireEvent.error(img);

        // Then
        expect(img.getAttribute('src')).toContain('empty');
    });
});
