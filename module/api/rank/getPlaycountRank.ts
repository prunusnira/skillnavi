import { fetchAdv } from '@/module/api/fetchAdv';
import { PlayCount } from '@/data/rank/PlayCount';
import { API } from '@/data/api';

interface Params {
    page: number;
    version: number;
}

export const getPlaycountRank = async ({ page, version }: Params) => {
    return await fetchAdv.get<PlayCount>(API.RANK.playcount, {
        params: {
            page,
            version,
        },
    });
};
