import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_CLEARTABLE } from '@/url/api';
import { GameType } from '@/common/game/data/GameType';
import { ClearTableResponse } from '@/feature/cleartable/data/ClearTable';

interface Params {
    type: GameType;
    user: number;
}

export const getClearTable = async ({ type = 'gf', user }: Params) => {
    return await fetchAdv.get<ClearTableResponse[]>(API_CLEARTABLE, {
        params: {
            type,
            user,
        },
    });
};
