
import { renderHook, act } from '@testing-library/react';
import { usePatternDifficulty } from '../usePatternDifficulty';
import { usePatternMenu } from '../usePatternMenu';
import { useSearchParams } from 'next/navigation';

jest.mock('../usePatternMenu');
jest.mock('next/navigation');

describe('usePatternDifficulty', () => {
  const mockUpdateSearchParams = jest.fn();

  beforeEach(() => {
    (usePatternMenu as jest.Mock).mockReturnValue({ updateSearchParams: mockUpdateSearchParams });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('difficulty=10'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the current difficulty from search params', () => {
    const { result } = renderHook(() => usePatternDifficulty());
    expect(result.current.currentDifficulty).toBe(10);
  });

  it('should call updateSearchParams when onChangeDifficulty is called', () => {
    const { result } = renderHook(() => usePatternDifficulty());
    const mockEvent = { currentTarget: { value: '20' } } as React.ChangeEvent<HTMLSelectElement>;

    act(() => {
      result.current.onChangeDifficulty(mockEvent);
    });

    expect(mockUpdateSearchParams).toHaveBeenCalledWith('difficulty', '20');
  });
});
