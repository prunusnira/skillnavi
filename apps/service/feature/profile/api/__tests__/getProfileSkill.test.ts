
import { getProfileSkill } from '../getProfileSkill';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';

jest.mock('@/lib/fetch/fetchAdv');

describe('getProfileSkill', () => {
  it('should return profile skill data for given IDs', async () => {
    const mockProfileSkills: ProfileSkill[] = [
      { id: 1, skill: 1000, hot: 500, old: 500 },
      { id: 2, skill: 1200, hot: 600, old: 600 },
    ];
    (fetchAdv.post as jest.Mock).mockResolvedValue(mockProfileSkills);

    const ids = [1, 2];
    const profileSkills = await getProfileSkill(ids);

    expect(profileSkills).toEqual(mockProfileSkills);
    expect(fetchAdv.post).toHaveBeenCalledWith(expect.any(String), {
      body: { id: ids },
    });
  });
});
