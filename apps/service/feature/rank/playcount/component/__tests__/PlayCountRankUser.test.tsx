
import { render, screen } from '@testing-library/react';
import PlayCountRankUser from '../PlayCountRankUser';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation');

jest.mock('@/common/table/user/UserLinkIcon', () => {
  return function MockUserLinkIcon({ user }) {
    return <div data-testid="user-link-icon">{user.name}</div>;
  };
});

describe('PlayCountRankUser', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it('renders user rank, name, and playcount for GF type', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('type=gf'));
    const mockUser = {
      rank: 1,
      id: 123,
      name: 'Test User',
      titletower: 'gold',
      openinfo: true,
      gcount: 100,
      dcount: 50,
    };
    render(<PlayCountRankUser {...mockUser} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByTestId('user-link-icon')).toHaveTextContent('Test User');
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders user rank, name, and playcount for DM type', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('type=dm'));
    const mockUser = {
      rank: 2,
      id: 456,
      name: 'Another User',
      titletower: 'silver',
      openinfo: false,
      gcount: 70,
      dcount: 120,
    };
    render(<PlayCountRankUser {...mockUser} />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByTestId('user-link-icon')).toHaveTextContent('Another User');
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('renders user rank, name, and playcount for ALL type', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('type=all'));
    const mockUser = {
      rank: 3,
      id: 789,
      name: 'Third User',
      titletower: 'bronze',
      openinfo: true,
      gcount: 30,
      dcount: 40,
    };
    render(<PlayCountRankUser {...mockUser} />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByTestId('user-link-icon')).toHaveTextContent('Third User');
    expect(screen.getByText('70')).toBeInTheDocument(); // 30 + 40
  });

  it('renders user rank, name, and playcount for default (empty) type', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
    const mockUser = {
      rank: 4,
      id: 101,
      name: 'Default User',
      titletower: 'platinum',
      openinfo: true,
      gcount: 80,
      dcount: 20,
    };
    render(<PlayCountRankUser {...mockUser} />);

    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByTestId('user-link-icon')).toHaveTextContent('Default User');
    expect(screen.getByText('100')).toBeInTheDocument(); // 80 + 20
  });
});
