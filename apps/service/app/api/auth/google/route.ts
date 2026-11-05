import { NextRequest, NextResponse } from 'next/server';
import { sha256 } from 'js-sha256';
import { registerSession } from '@/feature/auth/server';

interface GoogleTokenResponse {
    access_token?: string;
}

interface GoogleUserInfo {
    email?: string;
    email_verified?: boolean;
}

export async function POST(req: NextRequest) {
    const origin = req.headers.get('origin');
    if (
        !origin ||
        origin !== req.nextUrl.origin ||
        req.headers.get('x-requested-with') !== 'XmlHttpRequest'
    ) {
        return NextResponse.json({ error: 'invalid_request' }, { status: 403 });
    }

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
        const tokenResponse = await fetch(
            'https://oauth2.googleapis.com/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    code,
                    grant_type: 'authorization_code',
                    redirect_uri: req.nextUrl.origin,
                }),
                cache: 'no-store',
            },
        );

        if (!tokenResponse.ok) {
            console.error('Google OAuth code exchange failed', {
                status: tokenResponse.status,
            });
            return NextResponse.json(
                { error: 'google_code_exchange_failed' },
                { status: 401 },
            );
        }

        const tokenData = (await tokenResponse.json()) as GoogleTokenResponse;
        if (!tokenData.access_token) {
            return NextResponse.json(
                { error: 'google_code_exchange_failed' },
                { status: 401 },
            );
        }

        const userInfoResponse = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
                cache: 'no-store',
            },
        );

        if (!userInfoResponse.ok) {
            console.error('Google OAuth user lookup failed', {
                status: userInfoResponse.status,
            });
            return NextResponse.json(
                { error: 'google_user_lookup_failed' },
                { status: 401 },
            );
        }

        const userInfo = (await userInfoResponse.json()) as GoogleUserInfo;
        const emailPrefix = userInfo.email?.split('@')[0];
        if (userInfo.email_verified !== true || !emailPrefix) {
            return NextResponse.json(
                { error: 'google_email_not_verified' },
                { status: 403 },
            );
        }

        await registerSession(sha256(emailPrefix));
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: 'google_authentication_failed' },
            { status: 502 },
        );
    }
}
