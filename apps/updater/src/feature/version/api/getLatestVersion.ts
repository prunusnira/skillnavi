import { API_VERSION_LATEST } from '../../../common/api';

export const getLatestVersion = async () => {
    const result = await fetch(API_VERSION_LATEST);
    if (!result.ok) {
        throw new Error('Failed to fetch latest version');
    }
    return (await result.json()) as number;
};
