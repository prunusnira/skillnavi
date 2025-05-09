import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { Music } from '@/feature/music/data/Music';
import prisma from '@/lib/db/prisma';

export const GET = async (req: NextRequest) => {
    return await RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const mids = searchParams.get('mids');

            if (!mids) {
                return NextResponse.json([]);
            }

            const midList = JSON.parse(mids) as number[];

            const musicInfo = (await prisma.musicList.findMany({
                where: {
                    OR: midList.map((mid) => ({ id: mid })),
                },
            })) as Music[];

            return NextResponse.json(musicInfo);
        },
    });
};
