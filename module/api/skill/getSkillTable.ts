import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { SkillTableOld } from '@/data/skill/SkillTableOld';

interface Props {
    id: string;
    page: number;
    game: string;
    version: number;
    order?: string;
    pageType: string;
    isHot?: boolean;
    isOthers?: boolean;
}

export const getSkillTable = async ({
    id,
    page,
    game,
    version,
    order,
    pageType,
    isHot,
    isOthers,
}: Props) => {
    return await fetchAdv.get<SkillTableOld[]>(API.SKILL.table, {
        params: {
            userid: id,
            page,
            game,
            version,
            order,
            pageType,
            isHot,
            isOthers,
        },
    });
};
