import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import prisma from '@/module/lib/db/prisma';
import { MUSICLIST_SIZE } from '@/data/env/constant';
import { PlayCount, UserPlayCount } from '@/data/rank/PlayCount';
import { Profile } from '@/data/profile/Profile';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const page = Number(searchParams.get('page'));
            const version = Number(searchParams.get('version'));

            const count = await prisma.profileSkill.findMany({
                select: {
                    uid: true,
                    gcount: true,
                    dcount: true,
                },
                where: {
                    version,
                },
                skip: (page - 1) * MUSICLIST_SIZE,
                take: MUSICLIST_SIZE,
            });

            const uidList = count.map((u) => u.uid);

            const users = (await prisma.profileList.findMany({
                where: {
                    OR: uidList.map((id) => ({
                        id,
                    })),
                },
                select: {
                    id: true,
                    name: true,
                    titletower: true,
                    openinfo: true,
                },
            })) as Profile[];

            const list: UserPlayCount[] = [];
            count.forEach((cnt) => {
                const user = users.find((u) => u.id === cnt.uid);
                if (user) {
                    list.push({
                        ...user,
                        gcount: cnt.gcount || 0,
                        dcount: cnt.dcount || 0,
                    });
                }
            });

            const result: PlayCount = {
                pages: count.length,
                users: list,
            };

            return NextResponse.json(result);
        },
    });
};
