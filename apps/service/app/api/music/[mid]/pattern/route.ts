import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { Pattern } from '@/feature/music/data/Pattern';
import prisma from '@/lib/db/prisma';

export const GET = async (
    req: NextRequest,
    props: { params: Promise<{ mid: number }> },
) => {
    const params = await props.params;
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const { mid } = params;
            const version = Number(searchParams.get('version'));

            const pattern = (await prisma.patternList.findMany({
                where: {
                    mid: Number(mid),
                    version,
                },
            })) as Pattern[];

            return NextResponse.json(pattern);
        },
    });
};
