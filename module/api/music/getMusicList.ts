import { fetchAdv } from '@/module/api/fetchAdv';
import { MusicListPage } from '@/data/music/MusicListPageData';
import { API } from '@/data/api';
import { getLatestVersion } from '@/module/api/env/getGameVersions';

interface Params {
    version?: number;
    order?: string;
    page?: number;
}

export const getMusicList = async ({ version, order, page }: Params) => {
    const latest = await getLatestVersion();
    return await fetchAdv.get<MusicListPage>(API.MUSIC.list, {
        params: {
            version: version || latest,
            order: order || 'titleasc',
            page: page || 1,
        },
    });
};
