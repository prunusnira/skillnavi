import { Skill } from '@/data/skill/Skill';
import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';

interface Props {
    id: string;
    page: number;
    game: string;
    version: number;
    order: string;
    pageType: string;
}

export const getSkillTable = async ({
    id,
    page,
    game,
    version,
    order,
    pageType,
}: Props) => {
    return await fetchAdv.get<Skill>(API.SKILL.table, {
        params: {
            id,
            page,
            game,
            version,
            order,
            pageType,
        },
    });
};
