import { API } from '@/data/api';
import { fetchAdv } from '@/module/api/fetchAdv';
import { Pattern } from '@/data/pattern/Pattern';

interface Params {
    mid: number;
    version: number;
}

export const getMusicPattern = async ({ mid, version }: Params) => {
    return await fetchAdv.get<Pattern[]>(API.MUSIC.pattern(mid), {
        params: {
            version,
        },
    });
};
