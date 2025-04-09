import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Skill } from '@/feature/skill/data/Skill';
import { API_PATTERN_RANK } from '@/url/api';

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
    return await fetchAdv.get<Skill[]>(API_PATTERN_RANK, {
        params: {
            mid,
            version,
            patterncode,
            page,
        },
    });
};
