import { cookies } from 'next/headers';
import {
    APP_SESSION_COOKIE,
    getTokenFromSessionCookie,
} from './sessionToken';

export const getSessionToken = async () => {
    const cookieStore = await cookies();
    return getTokenFromSessionCookie(
        cookieStore.get(APP_SESSION_COOKIE)?.value,
    );
};

