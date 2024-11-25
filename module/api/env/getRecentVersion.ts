import { API } from '@/data/api';
import { GameVersion } from '@/data/game/GameVersion';
import { fetchAdv } from '@/module/api/fetchAdv';

export const getRecentVersion = async () => {
    return await fetchAdv.get<GameVersion>(API.ENV.recent);
};
