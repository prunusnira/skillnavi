import { fetchAdv } from '@/module/api/fetchAdv';
import { API_PATTERN_RANK_META } from '@/url/api';

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
        API_PATTERN_RANK_META,
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
