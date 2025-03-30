import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Profile } from '@/feature/profile/data/Profile';
import { API_PROFILE_ID } from '@/url/api';

export const getProfile = async (id: number[]) => {
    return await fetchAdv.post<Profile[]>(API_PROFILE_ID, {
        body: { id },
    });
};
