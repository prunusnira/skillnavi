import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { cookies } from 'next/headers';
import { APP_SESSION_COOKIE, getTokenFromSessionCookie } from '@/feature/auth/server/sessionToken';

export const POST = async (req: NextRequest) => {
    const cookieStore = await cookies();

    return RouteWrapper({
        req,
        work: async () => {
            const token = await getTokenFromSessionCookie(
                cookieStore.get(APP_SESSION_COOKIE)?.value,
            );

            if (!token) {
                return NextResponse.json(
                    { detail: 'unauthorized' },
                    { status: 401 },
                );
            }

            const existingProfile = await prisma.profileList.findUnique({
                where: { unique_id: token },
                select: { id: true },
            });
            if (existingProfile) {
                return NextResponse.json(
                    { detail: 'already joined' },
                    { status: 409 },
                );
            }

            await prisma.profileList.create({
                data: {
                    unique_id: token,
                },
            });

            return NextResponse.json({});
        },
    });
};
