import { fetchAdv } from '@/module/api/fetchAdv';
import { Profile } from '@/data/profile/Profile';
import { API_USER_TOKEN } from '@/url/api';

export const getUserFromToken = async (token: string) => {
    return await fetchAdv.get<Profile | null>(API_USER_TOKEN, {
        params: {
            token,
        },
    });
};
