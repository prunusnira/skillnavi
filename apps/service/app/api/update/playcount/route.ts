import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';

// 강제 플레이카운트 갱신
export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const body = (await req.json()) as { uid: number; version: number };
            const { uid, version } = body;
            const playcountData = (await prisma.skillList.findMany({
                where: {
                    uid,
                    playver: version,
                },
                select: {
                    playcount: true,
                    patterncode: true,
                },
            })) as { playcount: number; patterncode: number }[];

            let gcount = 0,
                dcount = 0;
            playcountData.forEach((entry) => {
                if (entry.patterncode < 9) {
                    gcount += entry.playcount;
                } else {
                    dcount += entry.playcount;
                }
            });

            await prisma.profileSkill.update({
                where: {
                    version_uid: {
                        version,
                        uid,
                    },
                },
                data: {
                    gcount,
                    dcount,
                },
            });
            return NextResponse.json({});
        },
    });
};
