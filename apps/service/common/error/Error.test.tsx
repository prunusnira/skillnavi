import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Error } from './Error';

describe('Error', () => {
    it('title과 children을 화면에 표시한다', () => {
        // Given
        const title = '에러 발생';
        const message = '뭔가 잘못되었습니다';

        // When
        render(
            <Error title={title}>{message}</Error>,
        );

        // Then
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(message)).toBeInTheDocument();
    });

    it('title이 없으면 children만 표시한다', () => {
        // Given
        const message = '내용만 있는 에러';

        // When
        render(<Error>{message}</Error>);

        // Then
        expect(screen.getByText(message)).toBeInTheDocument();
    });
});
