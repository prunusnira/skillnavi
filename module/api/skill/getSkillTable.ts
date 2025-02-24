import { fetchAdv } from '@/module/api/fetchAdv';
import { SkillReturn } from '@/data/skill/SkillReturn';
import { API_SKILL_TABLE } from '@/url/api';

interface Props {
    id: string;
    page: number;
    game: string;
    version: number;
    order?: string;
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
