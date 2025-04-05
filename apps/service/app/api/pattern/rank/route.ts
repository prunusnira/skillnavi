import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { Skill } from '@/feature/skill/data/Skill';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const mid = Number(searchParams.get('mid'));
            const version = Number(searchParams.get('version'));
            const page = Number(searchParams.get('page'));
            const patterncode = Number(searchParams.get('patterncode'));

            const result = (await prisma.skillList.findMany({
                where: {
                    mid,
                    playver: version,
                    patterncode,
                },
                orderBy: [
                    {
                        rate: 'desc',
                    },
                ],
                skip: (page - 1) * MUSICLIST_SIZE,
                take: MUSICLIST_SIZE,
            })) as Skill[];
            return NextResponse.json(result);
        },
    });
};
