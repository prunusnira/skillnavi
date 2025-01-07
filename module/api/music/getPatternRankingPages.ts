import { API } from '@/data/api';
import { fetchAdv } from '@/module/api/fetchAdv';

interface Params {
    mid: number;
    version: number;
    patterncode: number;
}

export const getPatternRankingPages = async ({
    mid,
    version,
    patterncode,
}: Params) => {
    const result = await fetchAdv.get<{ pages: number }>(
        API.PATTERN.rankPages,
        {
            params: {
                mid,
                version,
                patterncode,
            },
        },
    );
    return result.pages;
};
