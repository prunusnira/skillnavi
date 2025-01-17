import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { SkillReturn } from '@/data/skill/SkillReturn';

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
    return await fetchAdv.get<SkillReturn>(API.SKILL.table, {
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
