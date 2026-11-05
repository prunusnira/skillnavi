import { getSessionToken } from '@/feature/auth/server/cookie';
import { getUserFromToken } from '@/feature/auth/api/getUserFromToken';

export const getProfileSession = async () => {
    const token = await getSessionToken();

    if (!token) {
        return undefined;
    }

    return (await getUserFromToken(token)) ?? undefined;
};
