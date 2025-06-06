import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_SKILL_TABLE } from '@/url/api';
import { SkillReturn } from '@/feature/skill/data/Skill';

interface Props {
    id: string;
    page: number;
    game: string;
    version: number;
    order?: string;
    pageType: string;
}

export const getSkillTable = async (
    {
        id,
        page,
        game,
        version,
        order,
        pageType,
    }: Props,
) => {
    return await fetchAdv.get<SkillReturn>(API_SKILL_TABLE, {
        params: {
            userid: id,
            page,
            game,
            version,
            order,
            pageType,
        },
    });
};
