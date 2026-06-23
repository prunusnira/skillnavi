import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserLinkIcon from './UserLinkIcon';
import { ProfileSimple } from '@/feature/profile/data/ProfileSimple';

const { mockPush } = vi.hoisted(() => ({
    mockPush: vi.fn(),
}));

vi.mock('@/i18n/routing', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

vi.mock('next/image', () => ({
    __esModule: true,
    default: ({
        alt,
        src,
    }: {
        alt: string;
        src: string;
    }) => <img src={src} alt={alt} />,
}));

const createUser = (override: Partial<ProfileSimple> = {}): ProfileSimple => ({
    id: 1,
    name: '테스트유저',
    titletower: '',
    openinfo: true,
    ...override,
});

describe('UserLinkIcon', () => {
    it('openinfo가 true이고 이름이 있으면 이름을 표시한다', () => {
        // Given
        const user = createUser({ name: '홍길동' });

        // When
        render(<UserLinkIcon user={user} />);

        // Then
        expect(screen.getByText('홍길동')).toBeInTheDocument();
    });

    it('이름이 비어 있으면 (NO NAME)을 표시한다', () => {
        // Given
        const user = createUser({ name: '' });

        // When
        render(<UserLinkIcon user={user} />);

        // Then
        expect(screen.getByText('(NO NAME)')).toBeInTheDocument();
    });

    it('openinfo가 false면 (NO NAME)을 표시한다', () => {
        // Given
        const user = createUser({ openinfo: false, name: '숨김' });

        // When
        render(<UserLinkIcon user={user} />);

        // Then
        expect(screen.getByText('(NO NAME)')).toBeInTheDocument();
    });

    it('titletower가 있으면 아이콘 이미지를 표시한다', () => {
        // Given
        const user = createUser({ titletower: 'icon01' });

        // When
        render(<UserLinkIcon user={user} />);

        // Then
        const img = screen.getByAltText('icon');
        expect(img).toBeInTheDocument();
        expect(img.getAttribute('src')).toContain('icon01');
    });

    it('titletower가 없으면 아이콘을 렌더링하지 않는다', () => {
        // Given
        const user = createUser({ titletower: '' });

        // When
        render(<UserLinkIcon user={user} />);

        // Then
        expect(screen.queryByAltText('icon')).not.toBeInTheDocument();
    });

    it('openinfo가 true일 때 클릭하면 프로필 페이지로 이동한다', () => {
        // Given
        mockPush.mockClear();
        const user = createUser({ id: 42, openinfo: true });
        render(<UserLinkIcon user={user} />);

        // When
        fireEvent.click(screen.getByText('테스트유저'));

        // Then
        expect(mockPush).toHaveBeenCalledWith('/profile/42');
    });

    it('openinfo가 false일 때 클릭해도 이동하지 않는다', () => {
        // Given
        mockPush.mockClear();
        const user = createUser({ openinfo: false });
        render(<UserLinkIcon user={user} />);

        // When
        fireEvent.click(screen.getByText('(NO NAME)'));

        // Then
        expect(mockPush).not.toHaveBeenCalled();
    });
});
