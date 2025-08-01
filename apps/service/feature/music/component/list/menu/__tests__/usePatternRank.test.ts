
import { renderHook, act } from '@testing-library/react';
import { usePatternRank } from '../usePatternRank';
import { useAtom } from 'jotai';
import { RankType } from '@/feature/music/data/RankSelector';

jest.mock('jotai');

describe('usePatternRank', () => {
  let mockSetSelectedRank: jest.Mock;

  beforeEach(() => {
    mockSetSelectedRank = jest.fn();
    (useAtom as jest.Mock).mockReturnValue([[], mockSetSelectedRank]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return checkbox options with initial checked state', () => {
    const { result } = renderHook(() => usePatternRank());
    expect(result.current.checkboxOptions).toEqual([
      { display: 'SS', value: 'SS', checked: false },
      { display: 'S', value: 'S', checked: false },
      { display: 'A', value: 'A', checked: false },
      { display: 'B', value: 'B', checked: false },
      { display: 'C', value: 'C', checked: false },
      { display: 'F', value: 'F', checked: false },
    ]);
  });

  it('should add rank to selectedRank when checked is true', () => {
    const { result } = renderHook(() => usePatternRank());
    act(() => {
      result.current.onChangeRank('S' as RankType, true);
    });
    expect(mockSetSelectedRank).toHaveBeenCalledWith(['S']);
  });

  it('should remove rank from selectedRank when checked is false', () => {
    (useAtom as jest.Mock).mockReturnValue([['S', 'A'], mockSetSelectedRank]);
    const { result } = renderHook(() => usePatternRank());
    act(() => {
      result.current.onChangeRank('S' as RankType, false);
    });
    expect(mockSetSelectedRank).toHaveBeenCalledWith(['A']);
  });
});
