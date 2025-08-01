
import { getSnapshotDetail } from '../getSnapshotDetail';
import { fetchAdv } from '@/lib/fetch/fetchAdv';

jest.mock('@/lib/fetch/fetchAdv');

describe('getSnapshotDetail', () => {
  it('should return snapshot detail data', async () => {
    const mockDetail = 'Snapshot detail content';
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockDetail);

    const id = 'snap123';
    const type = 'gf';
    const date = '2023-01-01';
    const result = await getSnapshotDetail(id, type, date);

    expect(result).toEqual(mockDetail);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        id,
        type,
        date,
      },
    });
  });
});
