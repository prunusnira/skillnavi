import { fetchAdv } from '@/module/api/fetchAdv';
import { ProfileSkill } from '@/data/profile/ProfileSkill';
import { API } from '@/data/api';

export const getProfileSkill = async (id: number[]) => {
    return await fetchAdv.post<ProfileSkill[]>(API.PROFILE.skill, {
        body: { id },
    });
};
