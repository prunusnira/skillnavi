import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import prisma from '@/lib/db/prisma';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const mid = Number(searchParams.get('mid'));
            const version = Number(searchParams.get('version'));
            const patterncode = Number(searchParams.get('patterncode'));

            const result = await prisma.skillList.count({
                where: {
                    mid,
                    playver: version,
                    patterncode,
                },
            });

            const calc = result / MUSICLIST_SIZE;
            const pages = calc % 1 === 0 ? calc : Math.ceil(calc);
            return NextResponse.json({ pages });
        },
    });
};
