
import { getTowerIcon } from '../getTowerIcon';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { TowerFloorIcon } from '@/feature/tower/data/Tower';

jest.mock('@/lib/fetch/fetchAdv');

describe('getTowerIcon', () => {
  it('should return tower icon data', async () => {
    const mockTowerIcons: TowerFloorIcon[] = [
      { id: 1, name: 'Icon 1' },
      { id: 2, name: 'Icon 2' },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockTowerIcons);

    const id = 1;
    const result = await getTowerIcon(id);

    expect(result).toEqual(mockTowerIcons);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String));
  });
});
