
import { renderHook, act } from '@testing-library/react';
import { usePatternMusicVersion } from '../usePatternMusicVersion';
import { usePatternMenu } from '../usePatternMenu';
import { useSearchParams } from 'next/navigation';

jest.mock('../usePatternMenu');
jest.mock('next/navigation');

describe('usePatternMusicVersion', () => {
  const mockUpdateSearchParams = jest.fn();

  beforeEach(() => {
    (usePatternMenu as jest.Mock).mockReturnValue({ updateSearchParams: mockUpdateSearchParams });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('musicVersion=28'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the current music version from search params', () => {
    const { result } = renderHook(() => usePatternMusicVersion());
    expect(result.current.currentMusicVersion).toBe(28);
  });

  it('should call updateSearchParams when onChangeMusicVersion is called', () => {
    const { result } = renderHook(() => usePatternMusicVersion());
    const mockEvent = { currentTarget: { value: '27' } } as React.ChangeEvent<HTMLSelectElement>;

    act(() => {
      result.current.onChangeMusicVersion(mockEvent);
    });

    expect(mockUpdateSearchParams).toHaveBeenCalledWith('musicVersion', '27');
  });
});
