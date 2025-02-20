import { fetchAdv } from '@/module/api/fetchAdv';
import { GameVersion } from '@/data/game/GameVersion';
import { API } from '@/data/api';

export const getGameVersions = async () => {
    return await fetchAdv.get<GameVersion[]>(API.ENV.version);
};

export const getLatestVersion = async () => {
    // return await fetchAdv.get<number>(API.ENV.latest);
    return 28;
};
