import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { Recent } from '@/data/recent/Recent';

interface RecentType {
    recent: Recent[];
}

export const getRecent = async () => {
    return (await fetchAdv.get<RecentType>(API.RECENT)).recent;
};
