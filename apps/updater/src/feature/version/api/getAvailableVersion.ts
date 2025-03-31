import {API_VERSION_AVAILABLE} from '../../../common/api';
import {GameVersion} from '@skillnavi/data/src/version';

export const getAvailableVersion = async () => {
    const result = await fetch(API_VERSION_AVAILABLE, {
        method: 'GET',
    });
    if (!result.ok) {
        return null;
    }
    return (await result.json()) as GameVersion[];
};