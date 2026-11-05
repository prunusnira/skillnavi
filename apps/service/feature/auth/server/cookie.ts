import { cookies } from 'next/headers';
import {
    APP_SESSION_COOKIE,
    APP_SESSION_MAX_AGE,
    createSessionCookieValue,
    getTokenFromSessionCookie,
} from './sessionToken';

export const registerSession = async (token: string) => {
    const session = await createSessionCookieValue(token);
    const cookieStore = await cookies();

    cookieStore.set(APP_SESSION_COOKIE, session.value, {
        expires: new Date(session.expiresAt * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: APP_SESSION_MAX_AGE,
    });
};

export const getSessionToken = async () => {
    const cookieStore = await cookies();
    return getTokenFromSessionCookie(
        cookieStore.get(APP_SESSION_COOKIE)?.value,
    );
};

export const clearSession = async () => {
    const cookieStore = await cookies();
    cookieStore.set(APP_SESSION_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });
};
