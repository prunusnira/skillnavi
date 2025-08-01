
import { getPatternRanking } from '../getPatternRanking';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Skill } from '@/feature/skill/data/Skill';

jest.mock('@/lib/fetch/fetchAdv');

describe('getPatternRanking', () => {
  it('should return pattern ranking data', async () => {
    const mockSkills: Skill[] = [
      { id: 1, mid: 1, uid: 1, version: 28, type: 'gf', difficulty: 50, level: 500, play_type: 'd', skill_note: 100, skill_point: 100, clear_type: 1, rank_type: 1, full_combo: false, ex_clear: false, score: 900000 },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockSkills);

    const params = { mid: 1, version: 28, patterncode: 1, page: 1 };
    const data = await getPatternRanking(params);

    expect(data).toEqual(mockSkills);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params,
    });
  });
});
