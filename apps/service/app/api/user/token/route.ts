import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { Profile } from '@/feature/profile/data/Profile';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const params = req.nextUrl.searchParams;
            const token = params.get('token');

            const profile = (await prisma.profileList.findUnique({
                where: { unique_id: token || '' },
            })) as Profile;

            return NextResponse.json(profile);
        },
    });
};
