import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { FetchError } from '@/lib/fetch/FetchError';
import prisma from '@/lib/db/prisma';
import { Profile } from '@/feature/profile/data/Profile';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const token = searchParams.get('token');

            if (!token) {
                throw new FetchError({
                    status: 500,
                    response: { message: 'token does not exist' },
                });
            }

            const profile = (await prisma.profileList.findFirst({
                where: {
                    unique_id: token,
                },
            })) as Profile;

            return NextResponse.json(profile);
        },
    });
};
