import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getSessionToken } from '@/feature/auth/server';

export const POST = async (req: NextRequest) => {
    const origin = req.headers.get('origin');
    if (!origin || origin !== req.nextUrl.origin) {
        return NextResponse.json(
            { detail: 'invalid origin' },
            { status: 403 },
        );
    }

    return RouteWrapper({
        req,
        work: async () => {
            const token = await getSessionToken();

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
