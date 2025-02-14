import { MUSICLIST_SIZE } from '@/data/env/constant';
import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/module/lib/db/prisma';
import { Skill } from '@/data/skill/Skill';

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
