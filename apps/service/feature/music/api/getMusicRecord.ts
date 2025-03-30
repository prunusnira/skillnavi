import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Skill } from '@/feature/skill/data/Skill';
import { API_MUSIC_RECORD } from '@/url/api';

interface Params {
    mid: number;
    uid: number;
    version: number;
}

export const getMusicRecord = async ({ uid, mid, version }: Params) => {
    return await fetchAdv.get<Skill[]>(API_MUSIC_RECORD(mid), {
        params: {
            uid,
            version,
        },
    });
};
