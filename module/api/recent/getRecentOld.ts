import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { RecentOld } from '@/data/recent/RecentOld';

interface RecentType {
    recent: RecentOld[];
}

export const getRecentOld = async () => {
    return (await fetchAdv.get<RecentType>(API.RECENTOLD)).recent;
};
