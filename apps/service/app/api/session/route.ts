import { NextResponse } from 'next/server';
import { getUserFromToken } from '@/feature/auth/api/getUserFromToken';
import type { AuthSession } from '@/feature/auth/data/Session';
import { cookies } from 'next/headers';
import { APP_SESSION_COOKIE, getTokenFromSessionCookie } from '@/feature/auth/server/sessionToken';

export async function GET() {
    const cookieStore = await cookies();
    const token = await getTokenFromSessionCookie(
        cookieStore.get(APP_SESSION_COOKIE)?.value,
    );
    const user = token ? await getUserFromToken(token) : null;
    const session: AuthSession = {
        authenticated: Boolean(token),
        profile: user ? { id: user.id } : null,
    };

    return NextResponse.json(session, {
        headers: {
            'Cache-Control': 'no-store, max-age=0',
        },
    });
}
