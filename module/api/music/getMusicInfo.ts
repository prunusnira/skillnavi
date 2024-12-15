import { fetchAdv } from '@/module/api/fetchAdv';
import { API } from '@/data/api';
import { Music } from '@/data/music/Music';

interface Params {
    mid: number;
}

export const getMusicInfo = async ({ mid }: Params) => {
    return await fetchAdv.get<Music>(API.MUSIC.info, {
        params: {
            mid,
        },
    });
};
