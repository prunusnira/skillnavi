import { fetchAdv } from '@/module/api/fetchAdv';
import { Profile } from '@/data/profile/Profile';
import { API_PROFILE_ID } from '@/url/api';

export const getProfile = async (id: number[]) => {
    return await fetchAdv.post<Profile[]>(API_PROFILE_ID, {
        body: { id },
    });
};
