import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { MusicModel } from '@/data/music/MusicModel';
import { Music } from '@/data/music/Music';

export const GET = async (req: NextRequest) => {
    return await RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const mid = Number(searchParams.get('mid'));

            const musicInfo = await MusicModel.findOne({
                where: {
                    id: mid,
                },
            });

            return NextResponse.json(musicInfo?.dataValues as Music);
        },
    });
};
