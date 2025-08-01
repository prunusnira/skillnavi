
import { getTowerDetail } from '../getTowerDetail';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { TowerItem } from '@/feature/tower/data/Tower';

jest.mock('@/lib/fetch/fetchAdv');

describe('getTowerDetail', () => {
  it('should return tower detail data', async () => {
    const mockTowerItems: TowerItem[] = [
      { id: 1, name: 'Floor 1', level: 10, music_id: 101, pattern_code: 1, skill_point: 100 },
      { id: 2, name: 'Floor 2', level: 20, music_id: 102, pattern_code: 2, skill_point: 200 },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockTowerItems);

    const id = 1;
    const result = await getTowerDetail(id);

    expect(result).toEqual(mockTowerItems);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        id,
      },
    });
  });
});
