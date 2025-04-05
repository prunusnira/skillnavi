import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { Recent } from '@/feature/recent/data/Recent';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';
import { Profile } from '@/feature/profile/data/Profile';
import prisma from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const recent = (await prisma.profileSkill.findMany({
                orderBy: [
                    {
                        lastupdate: 'desc',
                    },
                ],
                take: 10,
            })) as ProfileSkill[];

            const uidList = recent.map((user) => user.uid);

            const users = (await prisma.profileList.findMany({
                where: {
                    OR: uidList.map((uid) => ({
                        id: uid,
                    })),
                },
            })) as Profile[];

            const recentList: Recent[] = [];

            recent.forEach((user) => {
                const me = users.find((u) => u.id === user.uid);
                if (me) {
                    const { titletower, id, name, openinfo } = me;
                    const { gskill, dskill, lastupdate } = user;

                    recentList.push({
                        titletower,
                        id,
                        name,
                        gskill,
                        dskill,
                        lastupdate,
                        openinfo,
                    });
                }
            });

            return NextResponse.json(recentList);
        },
    });
};
