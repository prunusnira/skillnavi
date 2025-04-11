import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Music } from '@/feature/music/data/Music';
import { API_MUSIC_INFO, API_MUSIC_INFOS } from '@/url/api';

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

interface MultiParams {
    mids: number[];
}

export const getMusicInfos = async ({ mids }: MultiParams) => {
    return await fetchAdv.get<Music[]>(API_MUSIC_INFOS, {
        params: {
            mids: JSON.stringify(mids),
        },
    });
};
