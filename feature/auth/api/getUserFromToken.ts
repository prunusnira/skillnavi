import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Profile } from '@/feature/profile/data/Profile';
import { API_USER_TOKEN } from '@/url/api';

export const getUserFromToken = async (token: string) => {
    return await fetchAdv.get<Profile | null>(API_USER_TOKEN, {
        params: {
            token,
        },
    });
};
