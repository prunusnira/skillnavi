import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { Music } from '@/data/music/Music';
import prisma from '@/module/lib/db/prisma';

export const GET = async (req: NextRequest) => {
    return await RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const mid = Number(searchParams.get('mid'));

            const musicInfo = (await prisma.musicList.findUnique({
                where: {
                    id: mid,
                },
            })) as Music;

            return NextResponse.json(musicInfo);
        },
    });
};
