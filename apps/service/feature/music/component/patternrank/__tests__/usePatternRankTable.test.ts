
import { renderHook, waitFor } from '@testing-library/react';
import usePatternRankTable from '../usePatternRankTable';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getPatternRanking } from '@/feature/music/api/getPatternRanking';
import { getProfile } from '@/feature/profile/api/getProfile';
import { getPatternRankingPages } from '@/feature/music/api/getPatternRankingPages';

jest.mock('next/navigation');
jest.mock('@tanstack/react-query');
jest.mock('@/feature/music/api/getPatternRanking');
jest.mock('@/feature/profile/api/getProfile');
jest.mock('@/feature/music/api/getPatternRankingPages');

describe('usePatternRankTable', () => {
  const mockSearchParams = new URLSearchParams({
    mid: '1',
    version: '28',
    ptcode: '1',
    page: '1',
  });

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch rank data, pages, and user data', async () => {
    const mockRankData = [
      { uid: 101, rate: 9500, fc: true },
      { uid: 102, rate: 8000, fc: false },
    ];
    const mockUserData = [
      { id: 101, name: 'User One', titletower: 'icon1' },
      { id: 102, name: 'User Two', titletower: 'icon2' },
    ];
    const mockPages = 5;

    (useQuery as jest.Mock)
      .mockImplementationOnce(() => ({ data: mockRankData, isLoading: false })) // For rankdata
      .mockImplementationOnce(() => ({ data: mockPages, isLoading: false })) // For pages
      .mockImplementationOnce(() => ({ data: mockUserData, isLoading: false })); // For userdata

    const { result } = renderHook(() => usePatternRankTable());

    await waitFor(() => {
      expect(getPatternRanking).toHaveBeenCalledWith({
        mid: 1,
        version: 28,
        patterncode: 1,
        page: 1,
      });
      expect(getPatternRankingPages).toHaveBeenCalledWith({
        mid: 1,
        version: 28,
        patterncode: 1,
      });
      expect(getProfile).toHaveBeenCalledWith([101, 102]);

      expect(result.current.rankTableData).toEqual([
        {
          position: 1,
          icon: 'icon1',
          name: 'User One',
          rate: 9500,
          rank: expect.any(Number),
          fc: true,
        },
        {
          position: 2,
          icon: 'icon2',
          name: 'User Two',
          rate: 8000,
          rank: expect.any(Number),
          fc: false,
        },
      ]);
      expect(result.current.pages).toBe(5);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should handle loading state', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
    });
    const { result } = renderHook(() => usePatternRankTable());
    expect(result.current.isLoading).toBe(true);
  });
});
