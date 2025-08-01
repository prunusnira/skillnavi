
import { getSnapshotList } from '../getSnapshotList';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { SnapshotMap } from '@/feature/snapshot/data/Snapshot';

jest.mock('@/lib/fetch/fetchAdv');

describe('getSnapshotList', () => {
  it('should return snapshot list data', async () => {
    const mockSnapshotList: SnapshotMap = {
      gf: [
        { date: '2023-01-01', id: 'snap1' },
        { date: '2023-01-02', id: 'snap2' },
      ],
      dm: [],
    };
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockSnapshotList);

    const id = 123;
    const result = await getSnapshotList(id);

    expect(result).toEqual(mockSnapshotList);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        id,
      },
    });
  });
});
