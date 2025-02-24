import { fetchAdv } from '@/module/api/fetchAdv';
import { ProfileSkill } from '@/data/profile/ProfileSkill';
import { API_PROFILE_SKILL } from '@/url/api';

export const getProfileSkill = async (id: number[]) => {
    return await fetchAdv.post<ProfileSkill[]>(API_PROFILE_SKILL, {
        body: { id },
    });
};
