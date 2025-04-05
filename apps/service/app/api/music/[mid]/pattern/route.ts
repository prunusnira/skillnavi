import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { Pattern } from '@/feature/music/data/Pattern';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export const GET = async (
    req: NextRequest,
    { params }: { params: { mid: number } },
) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const { mid } = params;
            const version = Number(searchParams.get('version'));

            const pattern = (await prisma.patternList.findMany({
                where: {
                    mid,
                    version,
                },
            })) as Pattern[];

            return NextResponse.json(pattern);
        },
    });
};
