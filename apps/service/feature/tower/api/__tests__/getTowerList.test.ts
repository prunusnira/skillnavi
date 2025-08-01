
import { getTowerList } from '../getTowerList';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { TowerList } from '@/feature/tower/data/Tower';

jest.mock('@/lib/fetch/fetchAdv');

describe('getTowerList', () => {
  it('should return a list of towers', async () => {
    const mockTowerLists: TowerList[] = [
      { id: 1, name: 'Tower 1', floors: 10, skill: 1000, open: true },
      { id: 2, name: 'Tower 2', floors: 20, skill: 2000, open: false },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockTowerLists);

    const result = await getTowerList();

    expect(result).toEqual(mockTowerLists);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String));
  });
});
