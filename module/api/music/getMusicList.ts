import { fetchAdv } from '@/module/api/fetchAdv';
import { MusicListPage } from '@/data/music/MusicListPageData';
import { API } from '@/data/api';

interface Params {
    version: number;
    order: string;
    page: number;
}

export const getMusicList = async ({ version, order, page }: Params) => {
    return await fetchAdv.get<MusicListPage>(API.MUSIC.list, {
        params: {
            version,
            order,
            page,
        },
    });
};
