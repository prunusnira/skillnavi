import { fetchAdv } from '@/module/api/fetchAdv';
import { SkillRankReturn } from '@/data/skill/SkillRank';
import { GameType } from '@/data/game/GameType';
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
