
import { getPlaycountRank } from '../getPlaycountRank';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { PlayCount } from '@/feature/rank/playcount/data/PlayCount';

jest.mock('@/lib/fetch/fetchAdv');

describe('getPlaycountRank', () => {
  it('should return playcount rank data', async () => {
    const mockPlayCount: PlayCount = {
      total: 100,
      page: 1,
      pageSize: 10,
      playcount: [
        { id: 1, name: 'Music 1', playcount: 100, patterncode: 1 },
        { id: 2, name: 'Music 2', playcount: 90, patterncode: 2 },
      ],
    };
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockPlayCount);

    const params = { page: 1, version: 28, gtype: 'gf' };
    const data = await getPlaycountRank(params);

    expect(data).toEqual(mockPlayCount);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params,
    });
  });
});
