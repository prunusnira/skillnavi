import { API_VERSION_AVAILABLE } from '../../../common/api';
import { GameVersion } from '../data/GameVersion.type';

export const getAvailableVersion = async () => {
    const result = await fetch(API_VERSION_AVAILABLE, {
        method: 'GET',
    });
    if (!result.ok) {
        return null;
    }
    const data = (await result.json()) as GameVersion[];
    return data;
};