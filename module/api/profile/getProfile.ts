import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { Profile } from '@/data/profile/Profile';

export const getProfile = async (id: number[]) => {
    return await fetchAdv.post<Profile[]>(API.PROFILE.id, {
        body: { id },
    });
};
