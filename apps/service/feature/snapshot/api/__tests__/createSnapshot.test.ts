
import { createSnapshot } from '../createSnapshot';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { SnapshotData } from '@/feature/snapshot/data/Snapshot';

jest.mock('@/lib/fetch/fetchAdv');

describe('createSnapshot', () => {
  it('should call fetchAdv.post with correct data', async () => {
    const mockSnapshotData: SnapshotData = {
      uid: 1,
      uname: 'Test User',
      type: 'gf',
      hot: [],
      other: [],
    };
    const mockResponse = { detail: 'Snapshot created' };
    (fetchAdv.post as jest.Mock).mockResolvedValue(mockResponse);

    const result = await createSnapshot(mockSnapshotData);

    expect(result).toEqual(mockResponse);
    expect(fetchAdv.post).toHaveBeenCalledWith(expect.any(String), {
      body: JSON.stringify(mockSnapshotData),
    });
  });
});
