import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { GameType } from '@/common/game/data/GameType';
import { ClearTableResponse } from '@/feature/cleartable/data/ClearTable';

export const dynamic = 'force-dynamic';

interface Params {
    type: GameType;
    level: number;
    user: number;
    version: number;
    rank: string;
}

const getTotalCount = async ({
    type,
    level,
    version,
}: Omit<Params, 'user' | 'rank'>) => {
    return prisma.patternList.count({
        where: {
            level: {
                gt: level,
                lte: level + 50,
            },
            version,
            patterncode: type === 'gf' ? { lt: 9 } : { gt: 8 },
        },
    });
};

const getRankRange = (rank: string) => {
    switch (rank) {
        case 'ss':
            return { high: 10000, low: 9500 };
        case 's':
            return { high: 9500, low: 8000 };
        case 'a':
            return { high: 8000, low: 7300 };
        case 'b':
            return { high: 7300, low: 6300 };
        default:
            return { high: 6300, low: 1 };
    }
};

const getCountTable = async ({ type, level, user, version, rank }: Params) => {
    const { high, low } = getRankRange(rank);
    return prisma.skillList.count({
        where: {
            level: {
                gt: level,
                lte: level + 50,
            },
            playver: version,
            uid: Number(user),
            patterncode: type === 'gf' ? { lt: 9 } : { gt: 8 },
            rate: {
                gte: low,
                lt: high,
            },
        },
    });
};

const getTotal = async ({
    type,
    version,
}: Omit<Params, 'rank' | 'user' | 'level'>) => {
    return Promise.allSettled(
        [
            100,
            150,
            200,
            250,
            300,
            350,
            400,
            450,
            500,
            550,
            600,
            650,
            700,
            750,
            800,
            850,
            900,
            950,
        ].map((lv) => getTotalCount({ type, level: lv, version })),
    );
};

const getCount = ({ type, version, user }: Omit<Params, 'rank' | 'level'>) => {
    return Promise.allSettled(
        [
            100,
            150,
            200,
            250,
            300,
            350,
            400,
            450,
            500,
            550,
            600,
            650,
            700,
            750,
            800,
            850,
            900,
            950,
        ].map((level) =>
            Promise.allSettled(
                [
                    'ss',
                    's',
                    'a',
                    'b',
                    'c',
                ].map((rank) =>
                    getCountTable({
                        rank,
                        version,
                        type,
                        user,
                        level,
                    }),
                ),
            ),
        ),
    );
};

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const type = searchParams.get('type') as GameType;
            const user = Number(searchParams.get('user'));
            const latest = await getLatestVersion();

            const totalCount = await getTotal({ type, version: latest });
            const countTable = await getCount({ type, version: latest, user });

            const totalCountValue = totalCount.map((x) =>
                x.status === 'fulfilled' ? x.value : 0,
            );
            const countTableValue = countTable.map((lvtable) =>
                lvtable.status === 'fulfilled'
                    ? lvtable.value.map((perRank) =>
                          perRank.status === 'fulfilled' ? perRank.value : 0,
                      )
                    : [],
            );

            const tableResponse: ClearTableResponse[] = [];

            Array.from(new Array(18).keys()).forEach((i) => {
                tableResponse.push({
                    level: (i + 2) * 50,
                    total: totalCountValue[i] || 0,
                    ss: countTableValue[i]?.[0] || 0,
                    s: countTableValue[i]?.[1] || 0,
                    a: countTableValue[i]?.[2] || 0,
                    b: countTableValue[i]?.[3] || 0,
                    c: countTableValue[i]?.[4] || 0,
                });
            });

            return NextResponse.json(tableResponse);
        },
    });
};
