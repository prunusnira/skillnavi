import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { PlayCount } from '@/feature/rank/playcount/data/PlayCount';
import { API_RANK_PLAYCOUNT } from '@/url/api';
import { GameTypeAll } from '@/common/game/data/GameType';

interface Params {
    page: number;
    version: number;
    gtype: GameTypeAll;
}

export const getPlaycountRank = async ({ page, version, gtype }: Params) => {
    return await fetchAdv.get<PlayCount>(API_RANK_PLAYCOUNT, {
        params: {
            page,
            version,
            gtype,
        },
    });
};
