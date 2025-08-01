
import { getTowerInfo } from '../getTowerInfo';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { TowerList } from '@/feature/tower/data/Tower';

jest.mock('@/lib/fetch/fetchAdv');

describe('getTowerInfo', () => {
  it('should return tower info data', async () => {
    const mockTowerInfo: TowerList = {
      id: 1,
      name: 'Test Tower',
      floors: 10,
      skill: 1000,
      open: true,
    };
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockTowerInfo);

    const id = 1;
    const result = await getTowerInfo(id);

    expect(result).toEqual(mockTowerInfo);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String));
  });
});
