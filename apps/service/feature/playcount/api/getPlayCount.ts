import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_PLAYCOUNT } from '@/url/api';
import { PlayCountResponse } from '@/feature/playcount/component/PlayCount.type';

interface Params {
    type: string;
    id?: number;
    version: number;
}

export const getPlayCount = async ({ type, id, version }: Params) => {
    if (!id) return null;
    return await fetchAdv.get<PlayCountResponse[]>(API_PLAYCOUNT, {
        params: {
            type,
            id,
            version,
        },
    });
};
