import { fetchAdv } from '@/module/api/fetchAdv';
import { Recent } from '@/data/recent/Recent';
import { API_RECENT } from '@/url/api';

export const getRecent = async () => {
    return await fetchAdv.get<Recent[]>(API_RECENT);
};
