import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Recent } from '@/feature/recent/data/Recent';
import { API_RECENT } from '@/url/api';

export const getRecent = async () => {
    return await fetchAdv.get<Recent[]>(API_RECENT, {
        next: {
            revalidate: 0,
        },
    });
};
