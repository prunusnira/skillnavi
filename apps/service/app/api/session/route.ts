import { NextResponse } from 'next/server';
import { getSessionToken } from '@/feature/auth/server';
import { getUserFromToken } from '@/feature/auth/api/getUserFromToken';
import type { AuthSession } from '@/feature/auth/data/Session';

export async function GET() {
    const token = await getSessionToken();
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
