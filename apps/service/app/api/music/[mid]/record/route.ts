import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { Skill } from '@/feature/skill/data/Skill';
import prisma from '@/lib/db/prisma';

export const GET = async (
    req: NextRequest,
    props: { params: Promise<{ mid: number }> },
) => {
    const params = await props.params;
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
                    mid: Number(mid),
                    playver: version,
                },
            })) as Skill[];

            return NextResponse.json(recordInfo);
        },
    });
};
