
import { render, screen } from '@testing-library/react';
import { PlayCountRankList } from '../PlayCountRankList';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

jest.mock('next/navigation');
jest.mock('@tanstack/react-query');
jest.mock('jotai');

jest.mock('../PlayCountRankUser', () => {
  return function MockPlayCountRankUser({ rank, name }) {
    return <div data-testid="playcount-rank-user">Rank: {rank}, Name: {name}</div>;
  };
});

jest.mock('@/common/pager/Pager', () => {
  return function MockPager({ page, allpage }) {
    return <div data-testid="pager">Pager: {page}/{allpage}</div>;
  };
});

describe('PlayCountRankList', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams({
      page: '1',
      type: 'gf',
      version: '28',
    }));
    (useAtomValue as jest.Mock).mockReturnValue({ id: 28 });
    (useQuery as jest.Mock).mockReturnValue({
      data: {
        users: [
          { id: 1, name: 'User A' },
          { id: 2, name: 'User B' },
        ],
        pages: 5,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders playcount rank users and pager', () => {
    render(<PlayCountRankList />);

    expect(screen.getByTestId('playcount-rank-user')).toBeInTheDocument();
    expect(screen.getByText('Rank: 1, Name: User A')).toBeInTheDocument();
    expect(screen.getByText('Rank: 2, Name: User B')).toBeInTheDocument();
    expect(screen.getByTestId('pager')).toHaveTextContent('Pager: 1/5');
  });

  it('handles missing ranking data gracefully', () => {
    (useQuery as jest.Mock).mockReturnValue({ data: undefined });
    render(<PlayCountRankList />);
    expect(screen.queryByTestId('playcount-rank-user')).not.toBeInTheDocument();
    expect(screen.getByTestId('pager')).toHaveTextContent('Pager: 1/1');
  });
});
