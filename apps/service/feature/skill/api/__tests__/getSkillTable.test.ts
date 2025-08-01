
import { getSkillTable } from '../getSkillTable';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { SkillReturn } from '@/feature/skill/data/Skill';

jest.mock('@/lib/fetch/fetchAdv');

describe('getSkillTable', () => {
  it('should return skill table data', async () => {
    const mockSkillTable: SkillReturn = {
      total: 100,
      page: 1,
      pageSize: 10,
      skill: [],
    };
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockSkillTable);

    const params = {
      id: '123',
      page: 1,
      game: 'gf',
      version: 28,
      order: 'skillpoint',
      pageType: 'target',
    };
    const data = await getSkillTable(params);

    expect(data).toEqual(mockSkillTable);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        userid: params.id,
        page: params.page,
        game: params.game,
        version: params.version,
        order: params.order,
        pageType: params.pageType,
      },
    });
  });
});
