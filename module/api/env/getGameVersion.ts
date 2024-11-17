import { fetchAdv } from '@/module/api/fetchAdv';
import { GameVersion } from '@/data/game/GameVersion';
import { API } from '@/data/api';

const getGameVersion = async () => {
    return await fetchAdv.get<GameVersion[]>(API.ENV.version);
};
