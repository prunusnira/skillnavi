import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Pager from './Pager';

const { mockPush, mockPathname } = vi.hoisted(() => ({
    mockPush: vi.fn(),
    mockPathname: vi.fn(() => '/list'),
}));

vi.mock('@/i18n/routing', () => ({
    usePathname: () => mockPathname(),
    useRouter: () => ({
        push: mockPush,
    }),
}));

vi.mock('next/navigation', () => ({
    useSearchParams: () => new URLSearchParams('page=1'),
}));

describe('Pager', () => {
    beforeEach(() => {
        mockPush.mockClear();
        mockPathname.mockReturnValue('/list');
    });

    it('allpage가 7 이하면 모든 페이지 버튼을 렌더링한다', () => {
        // Given
        const page = 1;
        const allpage = 5;

        // When
        render(
            <Pager
                page={page}
                allpage={allpage}
            />,
        );

        // Then
        for (let i = 1; i <= 5; i += 1) {
            expect(
                screen.getByRole('button', { name: String(i) }),
            ).toBeInTheDocument();
        }
    });

    it('현재 페이지 버튼은 선택 상태로 표시된다', () => {
        // Given
        const page = 3;
        const allpage = 5;

        // When
        render(
            <Pager
                page={page}
                allpage={allpage}
            />,
        );

        // Then
        const currentBtn = screen.getByRole('button', { name: '3' });
        // isSelected 클래스가 적용되어 있는지 확인
        expect(currentBtn.className).toContain('indigo-600');
    });

    it('페이지 버튼 클릭 시 router.push가 page 쿼리를 갱신하여 호출된다', () => {
        // Given
        render(
            <Pager
                page={1}
                allpage={5}
            />,
        );

        // When
        fireEvent.click(screen.getByRole('button', { name: '2' }));

        // Then
        expect(mockPush).toHaveBeenCalledTimes(1);
        const calledUrl = mockPush.mock.calls[0][0] as string;
        expect(calledUrl).toContain('page=2');
        expect(calledUrl).toContain('/list');
    });

    it('allpage가 1이면 단일 버튼만 렌더링한다 (현재 동작 유지)', () => {
        // Given
        const page = 1;
        const allpage = 1;

        // When
        render(
            <Pager
                page={page}
                allpage={allpage}
            />,
        );

        // Then
        // 현재 코드에서 end === 1 일 때 ButtonRounded text="1" 한 개만 렌더링
        expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    });

    it('allpage가 8 이상이고 현재 페이지가 3 이하면 1~5와 마지막 페이지를 렌더링한다', () => {
        // Given
        const page = 2;
        const allpage = 10;

        // When
        render(
            <Pager
                page={page}
                allpage={allpage}
            />,
        );

        // Then
        [
            1,
            2,
            3,
            4,
            5,
            10,
        ].forEach((n) => {
            expect(
                screen.getByRole('button', { name: String(n) }),
            ).toBeInTheDocument();
        });
        // 중간 생략 표시
        expect(screen.getByText('......')).toBeInTheDocument();
    });

    it('allpage가 8 이상이고 끝에 가까우면 1과 마지막 5개를 렌더링한다', () => {
        // Given
        const page = 9;
        const allpage = 10;

        // When
        render(
            <Pager
                page={page}
                allpage={allpage}
            />,
        );

        // Then
        [
            1,
            6,
            7,
            8,
            9,
            10,
        ].forEach((n) => {
            expect(
                screen.getByRole('button', { name: String(n) }),
            ).toBeInTheDocument();
        });
    });
});
