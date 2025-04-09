import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const cookie = (await req.json()) as { key: string, value: string };

            cookies().set(cookie.key, cookie.value, {
                path: '/',
                sameSite: 'lax',
            });

            return NextResponse.json({});
        },
    });
};