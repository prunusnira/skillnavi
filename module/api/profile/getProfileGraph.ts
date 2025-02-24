import { fetchAdv } from '@/module/api/fetchAdv';
import { ProfileGraphRaw } from '@/data/profile/ProfileGraph';
import { API_PROFILE_GRAPH } from '@/url/api';

export const getProfileGraph = async (id: string) => {
    return await fetchAdv.get<ProfileGraphRaw[]>(API_PROFILE_GRAPH(id));
};
