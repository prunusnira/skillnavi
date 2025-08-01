
import { renderHook, act } from '@testing-library/react';
import useSkillBox from '../useSkillBox';
import { useAtomValue } from 'jotai';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';

jest.mock('jotai');

describe('useSkillBox', () => {
  const mockLatestVersion = { id: 28 };

  beforeEach(() => {
    (useAtomValue as jest.Mock).mockReturnValue(mockLatestVersion);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should process skill data correctly', () => {
    const mockSkill: ProfileSkill[] = [
      { id: 1, version: 28, gskill: 100000, dskill: 50000 },
      { id: 2, version: 27, gskill: 90000, dskill: 40000 },
      { id: 3, version: 23, gskill: 80000, dskill: 30000 }, // Below VER_TB (24)
    ];

    const { result } = renderHook(() => useSkillBox({ skill: mockSkill }));

    expect(result.current.skillBox).toEqual([
      { version: 28, gf: 1000, dm: 500 },
      { version: 27, gf: 900, dm: 400 },
      { version: 26, gf: 0, dm: 0 }, // Assuming VER_TB is 24, and 26, 25 are missing
      { version: 25, gf: 0, dm: 0 },
      { version: 24, gf: 0, dm: 0 },
    ]);
  });

  it('should toggle viewAll state', () => {
    const { result } = renderHook(() => useSkillBox({ skill: [] }));

    expect(result.current.viewAll).toBe(false);

    act(() => {
      result.current.openViewBox();
    });
    expect(result.current.viewAll).toBe(true);

    act(() => {
      result.current.closeViewBox();
    });
    expect(result.current.viewAll).toBe(false);
  });

  it('should handle empty skill data', () => {
    const { result } = renderHook(() => useSkillBox({ skill: [] }));

    expect(result.current.skillBox.length).toBeGreaterThan(0); // Should still generate for all versions
    expect(result.current.skillBox[0].gf).toBe(0);
    expect(result.current.skillBox[0].dm).toBe(0);
  });
});
