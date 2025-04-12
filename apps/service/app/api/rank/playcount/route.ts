import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import {
    PlayCount, PlayCountRankData,
    UserPlayCount,
} from '@/feature/rank/playcount/data/PlayCount';
import { Profile } from '@/feature/profile/data/Profile';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { Prisma } from '@prisma/client';
import {
    getPlayCountRankALLQuery,
    getPlayCountRankDMQuery,
    getPlayCountRankGFQuery,
} from '@/feature/rank/playcount/db/PlayCountRank.prisma';

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const page = Number(searchParams.get('page'));
            const version = Number(searchParams.get('version') || await getLatestVersion());
            const gtype = searchParams.get('gtype');

            const query =
                gtype === 'gf' ? getPlayCountRankGFQuery({ page, version }) :
                    gtype === 'dm' ? getPlayCountRankDMQuery({ page, version }) :
                        getPlayCountRankALLQuery({ page, version });

            const rankdata = (await prisma.$queryRaw(
                Prisma.sql`${query}`,
            )) as PlayCountRankData[];

            const uidList = rankdata.map((u) => u.uid);

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
            rankdata.forEach((cnt) => {
                const user = users.find((u) => u.id === cnt.uid);
                if (user) {
                    list.push({
                        ...user,
                        gcount: cnt.gcount || 0,
                        dcount: cnt.dcount || 0,
                        allcount: cnt.allcount || 0,
                    });
                }
            });

            const result: PlayCount = {
                pages: rankdata.length,
                users: list,
            };

            return NextResponse.json(result);
        },
    });
};
