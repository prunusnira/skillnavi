
import { getProfile } from '../getProfile';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Profile } from '@/feature/profile/data/Profile';

jest.mock('@/lib/fetch/fetchAdv');

describe('getProfile', () => {
  it('should return profile data for given IDs', async () => {
    const mockProfiles: Profile[] = [
      { id: '1', name: 'User 1', email: 'user1@example.com' },
      { id: '2', name: 'User 2', email: 'user2@example.com' },
    ];
    (fetchAdv.post as jest.Mock).mockResolvedValue(mockProfiles);

    const ids = [1, 2];
    const profiles = await getProfile(ids);

    expect(profiles).toEqual(mockProfiles);
    expect(fetchAdv.post).toHaveBeenCalledWith(expect.any(String), {
      body: { id: ids },
    });
  });
});
