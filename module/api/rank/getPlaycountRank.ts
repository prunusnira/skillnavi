import { fetchAdv } from '@/module/api/fetchAdv';
import { PlayCount } from '@/data/rank/PlayCount';
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
