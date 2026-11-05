import { NextResponse } from 'next/server';
import { APP_SESSION_COOKIE } from '@/feature/auth/server/sessionToken';
import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = await cookies();

    cookieStore.set(APP_SESSION_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    });

    return NextResponse.json({ success: true });
}
