
import { renderHook, act, waitFor } from '@testing-library/react';
import useMusicRecord from '../useMusicRecord';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@/i18n/routing';
import { getMusicInfo } from '@/feature/music/api/getMusicInfo';
import { getMusicPattern } from '@/feature/music/api/getMusicPattern';
import { getMusicRecord } from '@/feature/music/api/getMusicRecord';
import { useAtomValue } from 'jotai';

jest.mock('next/navigation');
jest.mock('@tanstack/react-query');
jest.mock('@/i18n/routing');
jest.mock('@/feature/music/api/getMusicInfo');
jest.mock('@/feature/music/api/getMusicPattern');
jest.mock('@/feature/music/api/getMusicRecord');
jest.mock('jotai');

describe('useMusicRecord', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams({
      uid: '1',
      mid: '100',
      version: '28',
    }));
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush, pathname: '/test-path' });
    (useAtomValue as jest.Mock)
      .mockReturnValueOnce([{ id: 28, short: 'V28' }]) // atomGameVersionList
      .mockReturnValueOnce({ id: 28 }); // atomGameVersionLatest

    (useQuery as jest.Mock).mockImplementation((options) => {
      if (options.queryKey[0] === 'music') {
        return { data: { info: { version: 24 }, pattern: [] } };
      }
      if (options.queryKey[0] === 'skill') {
        return { data: [] };
      }
      return { data: undefined };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useMusicRecord());
    expect(result.current.gameMode).toBe('g');
    expect(result.current.ptcodeList).toEqual([]);
    expect(result.current.version).toBe('28');
    expect(result.current.mid).toBe('100');
  });

  it('should call changeVersion and update URL params', () => {
    const { result } = renderHook(() => useMusicRecord());
    act(() => {
      result.current.changeVersion(29);
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/test-path?uid=1&mid=100&version=29');
  });

  it('should change game type', () => {
    const { result } = renderHook(() => useMusicRecord());
    act(() => {
      result.current.changeGameType('b');
    });
    expect(result.current.gameMode).toBe('b');
  });

  it('should fetch music info and pattern', async () => {
    (getMusicInfo as jest.Mock).mockResolvedValue({ version: 24 });
    (getMusicPattern as jest.Mock).mockResolvedValue([]);

    renderHook(() => useMusicRecord());

    await waitFor(() => {
      expect(getMusicInfo).toHaveBeenCalledWith({ mid: 100 });
      expect(getMusicPattern).toHaveBeenCalledWith({ mid: 100, version: 28 });
    });
  });

  it('should fetch music record', async () => {
    (getMusicRecord as jest.Mock).mockResolvedValue([]);

    renderHook(() => useMusicRecord());

    await waitFor(() => {
      expect(getMusicRecord).toHaveBeenCalledWith({
        mid: 100,
        uid: 1,
        version: 28,
      });
    });
  });

  it('should filter skill data based on gameMode', () => {
    (useQuery as jest.Mock).mockImplementation((options) => {
      if (options.queryKey[0] === 'music') {
        return { data: { info: { version: 24 }, pattern: [] } };
      }
      if (options.queryKey[0] === 'skill') {
        return { data: [
          { patterncode: 1, rate: 100 }, // GF
          { patterncode: 5, rate: 200 }, // DM
          { patterncode: 9, rate: 300 }, // DRUM
        ] };
      }
      return { data: undefined };
    });

    const { result } = renderHook(() => useMusicRecord());

    act(() => {
      result.current.changeGameType('g');
    });
    expect(result.current.skill).toEqual([{ patterncode: 1, rate: 100 }]);
    expect(result.current.ptcodeList).toEqual([1, 2, 3, 4]);

    act(() => {
      result.current.changeGameType('b');
    });
    expect(result.current.skill).toEqual([{ patterncode: 5, rate: 200 }]);
    expect(result.current.ptcodeList).toEqual([5, 6, 7, 8]);

    act(() => {
      result.current.changeGameType('d');
    });
    expect(result.current.skill).toEqual([{ patterncode: 9, rate: 300 }]);
    expect(result.current.ptcodeList).toEqual([9, 10, 11, 12]);
  });
});
