import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { TowerList } from '@/feature/tower/data/Tower';
import { API_TOWER_INFO } from '@/url/api';

export const getTowerInfo = async (id: number) => {
    return fetchAdv.get<TowerList>(API_TOWER_INFO(id));
};