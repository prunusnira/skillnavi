import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';
import { API_PROFILE_SKILL } from '@/url/api';

export const getProfileSkill = async (id: number[]) => {
    return await fetchAdv.post<ProfileSkill[]>(API_PROFILE_SKILL, {
        body: { id },
    });
};
