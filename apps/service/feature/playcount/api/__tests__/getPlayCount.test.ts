
import { getPlayCount } from '../getPlayCount';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { PlayCountResponse } from '@/feature/playcount/component/PlayCount.type';

jest.mock('@/lib/fetch/fetchAdv');

describe('getPlayCount', () => {
  it('should return play count data when id is provided', async () => {
    const mockPlayCount: PlayCountResponse[] = [
      { id: 1, count: 10 },
      { id: 2, count: 20 },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockPlayCount);

    const params = { type: 'gf', id: 123, version: 28 };
    const data = await getPlayCount(params);

    expect(data).toEqual(mockPlayCount);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params,
    });
  });

  it('should return null when id is not provided', async () => {
    const params = { type: 'gf', version: 28 };
    const data = await getPlayCount(params);

    expect(data).toBeNull();
    expect(fetchAdv.get).not.toHaveBeenCalled();
  });
});
