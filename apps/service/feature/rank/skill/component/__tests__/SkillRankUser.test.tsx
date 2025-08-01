
import { render, screen } from '@testing-library/react';
import SkillRankUser from '../SkillRankUser';
import { useSearchParams } from 'next/navigation';
import { SkillRank } from '@/feature/skill/data/SkillRank';

jest.mock('next/navigation');

jest.mock('@/common/skillColor/SkillColor', () => {
  return function MockSkillColor({ value }) {
    return <div data-testid="skill-color">{value}</div>;
  };
});

jest.mock('@/common/table/user/UserLinkIcon', () => {
  return function MockUserLinkIcon({ user }) {
    return <div data-testid="user-link-icon">{user.name}</div>;
  };
});

describe('SkillRankUser', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('type=gf'));
  });

  it('renders user rank, name, type, and skill value', () => {
    const mockData: SkillRank = {
      uid: 123,
      name: 'Test User',
      titletower: 'gold',
      openinfo: true,
      value: 100000,
    };
    render(<SkillRankUser rank={1} data={mockData} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByTestId('user-link-icon')).toHaveTextContent('Test User');
    expect(screen.getByText('GF')).toBeInTheDocument();
    expect(screen.getByTestId('skill-color')).toHaveTextContent('1000');
  });

  it('renders DM type correctly', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('type=dm'));
    const mockData: SkillRank = {
      uid: 456,
      name: 'Another User',
      titletower: 'silver',
      openinfo: false,
      value: 50000,
    };
    render(<SkillRankUser rank={2} data={mockData} />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByTestId('user-link-icon')).toHaveTextContent('Another User');
    expect(screen.getByText('DM')).toBeInTheDocument();
    expect(screen.getByTestId('skill-color')).toHaveTextContent('500');
  });
});
