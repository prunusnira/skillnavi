import { fetchAdv } from '@/lib/fetch/fetchAdv';
import {
    PatternDifficultyCompareResult,
    PatternDifficultyCompareSort,
} from '@/feature/music/data/PatternDifficultyCompare';
import { API_PATTERN_COMPARE } from '@/url/api';

interface Params {
    version1: number;
    version2: number;
    value?: string;
    page?: number;
    sort?: PatternDifficultyCompareSort;
}

export const getPatternDifficultyCompare = ({
    version1,
    version2,
    value,
    page,
    sort,
}: Params) => {
    return fetchAdv.get<PatternDifficultyCompareResult>(API_PATTERN_COMPARE, {
        params: {
            version1,
            version2,
            value,
            page: page || 1,
            sort: sort || 'song',
        },
    });
};
