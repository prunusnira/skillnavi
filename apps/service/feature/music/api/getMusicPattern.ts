import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Pattern } from '@/feature/music/data/Pattern';
import { API_MUSIC_PATTERN } from '@/url/api';

interface Params {
    mid: number;
    version: number;
}

export const getMusicPattern = async ({ mid, version }: Params) => {
    return await fetchAdv.get<Pattern[]>(API_MUSIC_PATTERN(mid), {
        params: {
            version,
        },
    });
};
