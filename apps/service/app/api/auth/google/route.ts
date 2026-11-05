import { NextRequest, NextResponse } from 'next/server';
import { sha256 } from 'js-sha256';
import { OAuth2Client } from 'google-auth-library';
import { cookies } from 'next/headers';
import { APP_SESSION_COOKIE, APP_SESSION_MAX_AGE, createSessionCookieValue } from '@/feature/auth/server/sessionToken';

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();

    let code: unknown;
    try {
        ({ code } = await req.json());
    } catch {
        return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
    }

    if (typeof code !== 'string' || code.length === 0) {
        return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_SECRET;
    if (!clientId || !clientSecret) {
        return NextResponse.json(
            { error: 'google_oauth_not_configured' },
            { status: 500 },
        );
    }

    try {
        const client = new OAuth2Client(clientId, clientSecret, 'postmessage');

        const { tokens } = await client.getToken(code);

        if (!tokens.access_token) {
            return NextResponse.json(
                { error: 'google_code_exchange_failed' },
                { status: 401 },
            );
        }

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token ?? '',
            audience: clientId,
        })

        const payload = ticket.getPayload();

        const email = payload?.email;

        const emailPrefix = email?.split('@')[0];

        if (payload?.email_verified !== true || !emailPrefix) {
            return NextResponse.json(
                { error: 'google_email_not_verified' },
                { status: 403 },
            );
        }

        const sha = sha256(emailPrefix);

        const session = await createSessionCookieValue(sha);

        const isProduction = process.env.NODE_ENV === 'production';

        cookieStore.set(APP_SESSION_COOKIE, session.value, {
            expires: new Date(session.expiresAt * 1000),
            httpOnly: true,
            secure: isProduction,
            sameSite: 'lax',
            path: '/',
            maxAge: APP_SESSION_MAX_AGE,
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'google_authentication_failed' },
            { status: 502 },
        );
    }
}
