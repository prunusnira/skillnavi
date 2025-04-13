import { API_TOWER_ICON } from '@/url/api';
import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { TowerFloorIcon } from '@/feature/tower/data/Tower';

export const getTowerIcon = async (id: number) => {
    return fetchAdv.get<TowerFloorIcon[]>(API_TOWER_ICON(id));
};