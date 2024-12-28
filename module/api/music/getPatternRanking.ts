import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { Skill } from '@/data/skill/Skill';

interface Params {
    mid: number;
    version: number;
    patterncode: number;
    page: number;
}

export const getPatternRanking = async ({
    mid,
    version,
    patterncode,
    page,
}: Params) => {
    return await fetchAdv.get<Skill[]>(API.PATTERN.rank, {
        params: {
            mid,
            version,
            patterncode,
            page,
        },
    });
};
