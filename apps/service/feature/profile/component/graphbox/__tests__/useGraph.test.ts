
import { renderHook } from '@testing-library/react';
import useGraph from '../useGraph';
import { ProfileGraphRaw } from '@/feature/profile/data/ProfileGraph';

describe('useGraph', () => {
  it('should process raw graph data into GF and DM data with min/max values', () => {
    const mockRawData: ProfileGraphRaw[] = [
      { date: '2023-01-01', gf: 1000, dm: 500 },
      { date: '2023-01-02', gf: 1050, dm: 450 },
      { date: '2023-01-03', gf: 950, dm: 550 },
    ];

    const { result } = renderHook(() => useGraph({ data: mockRawData }));

    expect(result.current.gfdata).toEqual([
      { date: '2023-01-01', value: 1000 },
      { date: '2023-01-02', value: 1050 },
      { date: '2023-01-03', value: 950 },
    ]);
    expect(result.current.dmdata).toEqual([
      { date: '2023-01-01', value: 500 },
      { date: '2023-01-02', value: 450 },
      { date: '2023-01-03', value: 550 },
    ]);
    expect(result.current.gfmin).toBe(950);
    expect(result.current.gfmax).toBe(1050);
    expect(result.current.dmmin).toBe(450);
    expect(result.current.dmmax).toBe(550);
  });

  it('should handle empty data array', () => {
    const { result } = renderHook(() => useGraph({ data: [] }));

    expect(result.current.gfdata).toEqual([]);
    expect(result.current.dmdata).toEqual([]);
    expect(result.current.gfmin).toBeUndefined();
    expect(result.current.gfmax).toBeUndefined();
    expect(result.current.dmmin).toBeUndefined();
    expect(result.current.dmmax).toBeUndefined();
  });

  it('should handle single data point', () => {
    const mockRawData: ProfileGraphRaw[] = [
      { date: '2023-01-01', gf: 1000, dm: 500 },
    ];

    const { result } = renderHook(() => useGraph({ data: mockRawData }));

    expect(result.current.gfdata).toEqual([
      { date: '2023-01-01', value: 1000 },
    ]);
    expect(result.current.dmdata).toEqual([
      { date: '2023-01-01', value: 500 },
    ]);
    expect(result.current.gfmin).toBe(1000);
    expect(result.current.gfmax).toBe(1000);
    expect(result.current.dmmin).toBe(500);
    expect(result.current.dmmax).toBe(500);
  });
});
