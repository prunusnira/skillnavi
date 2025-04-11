import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { TowerItem } from '@/feature/tower/data/Tower';
import { API_TOWER_DETAIL } from '@/url/api';

export const getTowerDetail = async (id: number) => {
    return fetchAdv.get<TowerItem[]>(API_TOWER_DETAIL, {
        params: {
            id
        }
    })
}