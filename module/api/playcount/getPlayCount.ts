import { fetchAdv } from '@/module/api/fetchAdv';
import { API_PLAYCOUNT } from '@/url/api';
import { PlayCountResponse } from '@/component/playcount/PlayCount.type';

interface Params {
    type: string;
    id?: number;
}

export const getPlayCount = async ({ type, id }: Params) => {
    if (!id) return null;
    return await fetchAdv.get<PlayCountResponse[]>(API_PLAYCOUNT, {
        params: {
            type,
            id,
        },
    });
};
