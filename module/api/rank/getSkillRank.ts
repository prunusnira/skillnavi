import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { SkillRankReturn } from '@/data/skill/SkillRank';
import { GameType } from '@/data/game/GameType';

interface Params {
    type: GameType;
    page: number;
}

export const getSkillRank = async ({ type, page }: Params) => {
    return await fetchAdv.get<SkillRankReturn>(API.RANK.skill, {
        params: {
            page,
            type,
        },
    });
};
