import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { GameVersion } from '@skillnavi/data/src/version';
import {
    API_ENV_LATEST,
    API_ENV_VERSION,
    API_ENV_VERSIONS_FROM_TB,
} from '@/url/api';

export const getGameVersions = async () => {
    return await fetchAdv.get<GameVersion[]>(API_ENV_VERSION);
};

export const getGameVersionsFromTb = async () => {
    return await fetchAdv.get<GameVersion[]>(API_ENV_VERSIONS_FROM_TB);
};

export const getLatestVersion = async () => {
    return await fetchAdv.get<number>(API_ENV_LATEST);
};
