import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import { Skill } from '@/feature/skill/data/Skill';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const mid = JSON.parse(searchParams.get('midList') || '') as number[];
            const uid = searchParams.get('uid');
            const game = searchParams.get('game');

            if (!mid?.length || !uid || !game) {
                return NextResponse.json({});
            }

            const ptcodeOption =
                game === 'gf' ? { lt: 9 } :
                    game === 'dm' ? { gt: 8 } :
                        undefined;

            const data = (await prisma.skillList.findMany({
                where: {
                    OR: mid.map(id => ({
                        mid: id,
                        uid: Number(uid),
                        patterncode: ptcodeOption,
                    })),
                },
            })) as Skill[];

            return NextResponse.json(data);
        },
    });
};