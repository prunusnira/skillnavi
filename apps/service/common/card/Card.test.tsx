import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

describe('Card', () => {
    it('children을 렌더링한다', () => {
        // Given
        const content = '카드 내용';

        // When
        render(<Card>{content}</Card>);

        // Then
        expect(screen.getByText(content)).toBeInTheDocument();
    });

    it('title이 주어지면 제목 영역을 표시한다', () => {
        // Given
        const title = '카드 제목';

        // When
        render(<Card title={title}>내용</Card>);

        // Then
        expect(screen.getByText(title)).toBeInTheDocument();
    });

    it('sub가 주어지면 보조 영역도 표시한다', () => {
        // Given
        const title = '제목';
        const sub = '보조 텍스트';

        // When
        render(
            <Card
                title={title}
                sub={sub}
            >
                내용
            </Card>,
        );

        // Then
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(sub)).toBeInTheDocument();
    });
});
