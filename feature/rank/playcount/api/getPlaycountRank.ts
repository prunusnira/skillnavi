import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { PlayCount } from '@/feature/rank/playcount/data/PlayCount';
import { API_RANK_PLAYCOUNT } from '@/url/api';

interface Params {
    page: number;
    version: number;
}

export const getPlaycountRank = async ({ page, version }: Params) => {
    return await fetchAdv.get<PlayCount>(API_RANK_PLAYCOUNT, {
        params: {
            page,
            version,
        },
    });
};
