import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { MusicListPage } from '@/feature/music/data/MusicListPageData';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { API_MUSIC_LIST } from '@/url/api';

interface Params {
    userid?: number;
    musicVersion?: number;
    gameVersion?: number;
    difficulty?: number;
    order?: string;
    page?: number;
}

export const getMusicList = async ({
    userid,
    musicVersion,
    gameVersion,
    difficulty,
    order,
    page,
}: Params) => {
    const latest = await getLatestVersion();
    return await fetchAdv.get<MusicListPage>(API_MUSIC_LIST, {
        params: {
            userid,
            musicVersion: musicVersion || latest,
            gameVersion: gameVersion || latest,
            difficulty,
            order: order || 'titleasc',
            page: page || 1,
        },
    });
};
