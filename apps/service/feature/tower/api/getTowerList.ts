import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { API_TOWER_LIST } from '@/url/api';
import { TowerList } from '@/feature/tower/data/Tower';

export const getTowerList = async () => {
    return fetchAdv.get<TowerList[]>(API_TOWER_LIST);
};