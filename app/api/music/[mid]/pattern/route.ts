import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { Pattern } from '@/data/pattern/Pattern';
import prisma from '@/module/lib/db/prisma';

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
