import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const result = await prisma.gameVersion.findMany({
                where: {
                    ableToUpdate: 1,
                },
            });
            return NextResponse.json(result);
        },
    });
};
