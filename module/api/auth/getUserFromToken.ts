import { fetchAdv } from '@/module/api/fetchAdv';
import { Profile } from '@/data/profile/Profile';
import { API } from '@/data/api';

export const getUserFromToken = async (token: string) => {
    return await fetchAdv.get<Profile | null>(API.USER.token, {
        params: {
            token,
        },
    });
};
