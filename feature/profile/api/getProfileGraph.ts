import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { ProfileGraphRaw } from '@/feature/profile/data/ProfileGraph';
import { API_PROFILE_GRAPH } from '@/url/api';

export const getProfileGraph = async (id: string) => {
    return await fetchAdv.get<ProfileGraphRaw[]>(API_PROFILE_GRAPH(id));
};
