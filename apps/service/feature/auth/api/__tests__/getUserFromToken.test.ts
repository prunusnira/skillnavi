import { getUserFromToken } from '../getUserFromToken';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Profile } from '@/feature/profile/data/Profile';
import dayjs from 'dayjs';

jest.mock('@/lib/fetch/fetchAdv');

describe('getUserFromToken', () => {
    it('should return user profile when token is valid', async () => {
        const mockProfile: Profile = {
            id: 1,
            name: 'Test',
            titletower: '',
            title: '',
            unique_id: 'test',
            openinfo: true,
            comment: '',
            update_at: dayjs().toDate(),
            blocked: 0,
            reason: '',
            joindate: dayjs().toDate(),
        };
        (fetchAdv.get as jest.Mock).mockResolvedValue(mockProfile);

        const token = 'valid-token';
        const user = await getUserFromToken(token);

        expect(user).toEqual(mockProfile);
        expect(fetchAdv.get).toHaveBeenCalledWith(expect.any(String), {
            params: {
                token,
            },
        });
    });

    it('should return null when token is invalid', async () => {
        (fetchAdv.get as jest.Mock).mockResolvedValue(null);

        const token = 'invalid-token';
        const user = await getUserFromToken(token);

        expect(user).toBeNull();
    });
});
