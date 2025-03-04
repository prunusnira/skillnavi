import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { GameVersion } from '@/common/game/data/GameVersion';
import { API_ENV_VERSION } from '@/url/api';

export const getGameVersions = async () => {
    return await fetchAdv.get<GameVersion[]>(API_ENV_VERSION);
};

export const getLatestVersion = async () => {
    // return await fetchAdv.get<number>(API_ENV_LATEST);
    return 28;
};
