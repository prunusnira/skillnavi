import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { MusicListPage } from '@/feature/music/data/MusicListPageData';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { API_MUSIC_LIST } from '@/url/api';

interface Params {
    version?: number;
    order?: string;
    page?: number;
}

export const getMusicList = async ({ version, order, page }: Params) => {
    const latest = await getLatestVersion();
    return await fetchAdv.get<MusicListPage>(API_MUSIC_LIST, {
        params: {
            version: version || latest,
            order: order || 'titleasc',
            page: page || 1,
        },
    });
};
