
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';
import { API_PROFILE_DETAIL } from '@/url/api';

export const getProfileDetail = (id: number, version: number) => {
    return fetchAdv.get<ProfileSkill>(API_PROFILE_DETAIL(id, version));
};
