import { fetchAdv } from '@/module/api/fetchAdv';
import { Music } from '@/data/music/Music';
import { API_MUSIC_INFO } from '@/url/api';

interface Params {
    mid: number;
}

export const getMusicInfo = async ({ mid }: Params) => {
    return await fetchAdv.get<Music>(API_MUSIC_INFO, {
        params: {
            mid,
        },
    });
};
