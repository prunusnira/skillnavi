
import { getProfileSession } from '../getProfileSession';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { getTokenFromSession } from '@/lib/session/getTokenFromSession';
import { Profile } from '@/feature/profile/data/Profile';

jest.mock('@/lib/fetch/fetchAdv');
jest.mock('@/lib/session/getTokenFromSession');

describe('getProfileSession', () => {
  it('should return profile data when session and token are valid', async () => {
    const mockSession = { accessToken: 'test-token' };
    const mockProfile: Profile = { id: '1', name: 'Test User', email: 'test@example.com' };

    (getTokenFromSession as jest.Mock).mockReturnValue('test-token');
    (fetchAdv.get as jest.Mock).mockResolvedValue(mockProfile);

    const profile = await getProfileSession(mockSession as any);

    expect(profile).toEqual(mockProfile);
    expect(getTokenFromSession).toHaveBeenCalledWith(mockSession);
    expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
      params: {
        token: 'test-token',
      },
    });
  });

  it('should return undefined when session is null', async () => {
    (getTokenFromSession as jest.Mock).mockReturnValue(undefined);

    const profile = await getProfileSession(null);

    expect(profile).toBeUndefined();
    expect(getTokenFromSession).toHaveBeenCalledWith(null);
    expect(fetchAdv.get).not.toHaveBeenCalled();
  });

  it('should return undefined when token is not found in session', async () => {
    const mockSession = { accessToken: undefined };
    (getTokenFromSession as jest.Mock).mockReturnValue(undefined);

    const profile = await getProfileSession(mockSession as any);

    expect(profile).toBeUndefined();
    expect(getTokenFromSession).toHaveBeenCalledWith(mockSession);
    expect(fetchAdv.get).not.toHaveBeenCalled();
  });
});
