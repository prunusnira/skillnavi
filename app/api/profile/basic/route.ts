import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { FetchError } from '@/data/fetch/FetchError';
import prisma from '@/module/lib/db/prisma';
import { Profile } from '@/data/profile/Profile';

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
