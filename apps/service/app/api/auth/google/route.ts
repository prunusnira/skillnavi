import { NextRequest, NextResponse } from 'next/server';
import { registerTokens } from '@/feature/auth/server';
import { GoogleToken } from '@/feature/auth/data/Session';

export async function POST(req: NextRequest) {
    const body = await req.json() as GoogleToken;

    console.log(body);

    await registerTokens(
        body.access_token,
        body.refresh_token,
        body.expiry_date
    );

    return NextResponse.json({ body });
}