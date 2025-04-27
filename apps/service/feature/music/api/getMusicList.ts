import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { MusicListPage } from '@/feature/music/data/MusicListPageData';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { API_MUSIC_LIST } from '@/url/api';

interface Params {
    musicVersion?: number;
    gameVersion?: number;
    order?: string;
    page?: number;
}

export const getMusicList = async ({
    musicVersion,
    gameVersion,
    order,
    page,
}: Params) => {
    const latest = await getLatestVersion();
    return await fetchAdv.get<MusicListPage>(API_MUSIC_LIST, {
        params: {
            musicVersion: musicVersion || latest,
            gameVersion: gameVersion || latest,
            order: order || 'titleasc',
            page: page || 1,
        },
    });
};
