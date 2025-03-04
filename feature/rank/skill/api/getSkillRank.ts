import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { SkillRankReturn } from '@/feature/skill/data/SkillRank';
import { GameType } from '@/common/game/data/GameType';
import { API_RANK_SKILL } from '@/url/api';

interface Params {
    type: GameType;
    page: number;
}

export const getSkillRank = async ({ type, page }: Params) => {
    return await fetchAdv.get<SkillRankReturn>(API_RANK_SKILL, {
        params: {
            page,
            type,
        },
    });
};
