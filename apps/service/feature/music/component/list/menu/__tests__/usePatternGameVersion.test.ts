
import { renderHook, act } from '@testing-library/react';
import { usePatternGameVersion } from '../usePatternGameVersion';
import { usePatternMenu } from '../usePatternMenu';
import { useSearchParams } from 'next/navigation';

jest.mock('../usePatternMenu');
jest.mock('next/navigation');

describe('usePatternGameVersion', () => {
  const mockUpdateSearchParams = jest.fn();

  beforeEach(() => {
    (usePatternMenu as jest.Mock).mockReturnValue({ updateSearchParams: mockUpdateSearchParams });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('gameVersion=28'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the current game version from search params', () => {
    const { result } = renderHook(() => usePatternGameVersion());
    expect(result.current.currentGameVersion).toBe(28);
  });

  it('should call updateSearchParams when onChangeGameVersion is called', () => {
    const { result } = renderHook(() => usePatternGameVersion());
    const mockEvent = { currentTarget: { value: '27' } } as React.ChangeEvent<HTMLSelectElement>;

    act(() => {
      result.current.onChangeGameVersion(mockEvent);
    });

    expect(mockUpdateSearchParams).toHaveBeenCalledWith('gameVersion', '27');
  });
});
