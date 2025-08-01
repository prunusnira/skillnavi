
import { getTowerDetailUserData } from '../getTowerDetailUserData';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Skill } from '@/feature/skill/data/Skill';

jest.mock('@/lib/fetch/fetchAdv');

describe('getTowerDetailUserData', () => {
  it('should return tower detail user data', async () => {
    const mockSkills: Skill[] = [
      { id: 1, mid: 101, uid: 1, version: 28, type: 'gf', difficulty: 50, level: 500, play_type: 'd', skill_note: 100, skill_point: 100, clear_type: 1, rank_type: 1, full_combo: false, ex_clear: false, score: 900000 },
    ];
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockSkills);

    const mids = [101, 102];
    const uid = 1;
    const game = 'gf';
    const result = await getTowerDetailUserData({ mids, uid, game });

    expect(result).toEqual(mockSkills);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        midList: JSON.stringify(mids),
        uid,
        game,
      },
    });
  });
});
