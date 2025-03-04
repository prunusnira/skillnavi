import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const params = req.nextUrl.searchParams;
            const token = params.get('token');

            const profile = await prisma.profileList.findUnique({
                where: { unique_id: token || '' },
            });

            return NextResponse.json(profile);
        },
    });
};
