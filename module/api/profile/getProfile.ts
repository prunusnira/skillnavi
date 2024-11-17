import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { ProfileOld } from '@/data/profile/ProfileOld';

interface Profile {
    profile: ProfileOld;
}

export const getProfile = async (id: string) => {
    return await fetchAdv.get<Profile>(API.PROFILE.old.id(id));
};
