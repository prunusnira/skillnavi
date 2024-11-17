import { fetchAdv } from '@/module/api/fetchAdv';
import { ProfileGraphRaw } from '@/data/profile/ProfileGraph';
import { API } from '@/data/api';

export const getProfileGraph = async (id: string) => {
    return await fetchAdv.get<ProfileGraphRaw[]>(API.PROFILE.graph(id));
};
