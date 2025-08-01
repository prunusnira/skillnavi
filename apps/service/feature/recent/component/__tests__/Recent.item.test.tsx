import { render, screen } from '@testing-library/react';
import { RecentItem } from '../Recent.item';
import { Recent } from '../../data/Recent';

jest.mock('@/common/table/user/UserLinkIcon', () => {
    return function MockUserLinkIcon({ user }) {
        return <div data-testid="user-link-icon">{user.name}</div>;
    };
});

jest.mock('@/common/skillColor/SkillColor', () => {
    return function MockSkillColor({ value }) {
        return <div data-testid="skill-color">{value}</div>;
    };
});

describe('RecentItem', () => {
    it('renders user info and skill values', () => {
        const mockUser: Recent = {
            id: 1,
            name: 'Test User',
            titletower: 'gold',
            openinfo: true,
            gskill: 100000,
            dskill: 50000,
            mid: 0, // Not used in this component
            music_name: '', // Not used in this component
            skill: 0, // Not used in this component
            date: '', // Not used in this component
        };
        render(<RecentItem user={mockUser} />);

        expect(screen.getByTestId('user-link-icon')).toHaveTextContent(
            'Test User',
        );
        expect(screen.getByText('GF')).toBeInTheDocument();
        expect(screen.getByText('DM')).toBeInTheDocument();
        expect(screen.getAllByTestId('skill-color')[0]).toHaveTextContent(
            '1000',
        );
        expect(screen.getAllByTestId('skill-color')[1]).toHaveTextContent(
            '500',
        );
    });
});
