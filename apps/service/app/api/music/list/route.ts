import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import {
    MusicListPage,
    MusicListPageData,
} from '@/feature/music/data/MusicListPageData';
import { Music } from '@/feature/music/data/Music';
import { Pattern } from '@/feature/music/data/Pattern';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import prisma from '@/lib/db/prisma';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;

            const musicVersion = Number(searchParams.get('musicVersion'));
            const gameVersion = Number(searchParams.get('gameVersion'));
            const order = searchParams.get('order') || 'titleasc';
            const page = Number(searchParams.get('page'));

            const musicCount = await prisma.musicList.count({
                where: {
                    version: musicVersion,
                },
            });

            // 현재 페이지의 음악 목록
            const musicList = (await prisma.musicList.findMany({
                where: {
                    version: musicVersion,
                },
                orderBy: [
                    {
                        name: order === 'titleasc' ? 'asc' : 'desc',
                    },
                ],
                take: MUSICLIST_SIZE,
                skip: (page - 1) * MUSICLIST_SIZE,
            })) as Music[];

            const displayData: MusicListPageData[] = [];

            for (const music of musicList) {
                // 가져온 음악목록에 대해 현재 버전에 맞추어 난이도 정보 가져오기
                const { id, name, composer, remove, version: musicVer } = music;

                const patternList = (await prisma.patternList.findMany({
                    where: {
                        mid: id,
                        version: gameVersion,
                    },
                })) as Pattern[];

                const data: MusicListPageData = {
                    mid: id,
                    name,
                    composer,
                    remove,
                    version: musicVer,
                    patterns: patternList,
                };
                if (data) {
                    displayData.push(data);
                }
            }

            const musicListPage: MusicListPage = {
                count: musicCount,
                music: displayData,
            };

            return NextResponse.json(musicListPage);
        },
    });
};
