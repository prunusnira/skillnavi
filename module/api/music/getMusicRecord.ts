import { fetchAdv } from '@/module/api/fetchAdv';
import { Skill } from '@/data/skill/Skill';
import { API } from '@/data/api';

interface Params {
    mid: number;
    uid: number;
    version: number;
}

export const getMusicRecord = async ({ uid, mid, version }: Params) => {
    return await fetchAdv.get<Skill[]>(API.MUSIC.record(mid), {
        params: {
            uid,
            version,
        },
    });
};
