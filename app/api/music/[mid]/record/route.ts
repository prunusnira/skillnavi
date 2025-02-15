import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { Skill } from '@/data/skill/Skill';
import prisma from '@/module/lib/db/prisma';

export const GET = async (
    req: NextRequest,
    { params }: { params: { mid: number } },
) => {
    return await RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const { mid } = params;
            const uid = Number(searchParams.get('uid'));
            const version = Number(searchParams.get('version'));

            const recordInfo = (await prisma.skillList.findMany({
                where: {
                    uid,
                    mid,
                    playver: version,
                },
            })) as Skill[];

            return NextResponse.json(recordInfo);
        },
    });
};
