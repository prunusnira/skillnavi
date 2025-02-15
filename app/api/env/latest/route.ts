import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/module/lib/db/prisma';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const result = await prisma.gameVersion.findFirst({
                take: 1,
                orderBy: {
                    id: 'desc',
                },
            });
            return NextResponse.json(result?.id);
        },
    });
};
