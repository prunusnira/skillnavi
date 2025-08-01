
import { getSkillRank } from '../getSkillRank';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { SkillRankReturn } from '@/feature/skill/data/SkillRank';

jest.mock('@/lib/fetch/fetchAdv');

describe('getSkillRank', () => {
  it('should return skill rank data', async () => {
    const mockSkillRank: SkillRankReturn = {
      total: 100,
      page: 1,
      pageSize: 10,
      users: [
        { id: 1, name: 'User 1', skill: 1000, hot: 500, old: 500 },
        { id: 2, name: 'User 2', skill: 900, hot: 450, old: 450 },
      ],
    };
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockSkillRank);

    const params = { type: 'gf', page: 1 };
    const data = await getSkillRank(params);

    expect(data).toEqual(mockSkillRank);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params,
    });
  });
});
