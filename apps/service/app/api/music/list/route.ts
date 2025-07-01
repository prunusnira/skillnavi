import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import {
    MusicListPage,
    MusicListPageData,
} from '@/feature/music/data/MusicListPageData';
import { Music } from '@/feature/music/data/Music';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import prisma from '@/lib/db/prisma';
import { Skill } from '@/feature/skill/data/Skill';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;

            const uid = searchParams.get('userid');
            const userid = uid ? Number(uid) : undefined;
            const musicVersion = Number(searchParams.get('musicVersion'));
            const gameVersion = Number(searchParams.get('gameVersion'));
            const order = searchParams.get('order') || 'titleasc';
            const page = Number(searchParams.get('page'));
            const difficulty = Number(searchParams.get('difficulty') ?? 0);
            // const rank = searchParams.get('rank');

            const musicCount = await prisma.musicList.count({
                where: {
                    version: musicVersion,
                },
            });

            // const withRankSS = {
            //     rate: {
            //         gte: 9500,
            //         lte: 10000,
            //     },
            // };
            // const withRankS = {
            //     rate: {
            //         gte: 8000,
            //         lt: 9500,
            //     },
            // };
            // const withRankA = {
            //     rate: {
            //         gte: 7300,
            //         lt: 8000,
            //     },
            // };
            // const withRankB = {
            //     rate: {
            //         gte: 6300,
            //         lt: 7300,
            //     },
            // };
            // const withRankC = {
            //     rate: {
            //         gt: 0,
            //         lt: 6300,
            //     },
            // };

            // 현재 페이지의 음악 목록
            // 특정 난이도 범위가 들어있는 곡만 필터링할 필요 있음
            const musicList = (await prisma.musicList.findMany({
                where: {
                    version: musicVersion,
                    patterns: {
                        some: {
                            version: {
                                equals: gameVersion,
                            },
                            level:
                                difficulty > 0
                                    ? {
                                          gte: difficulty,
                                          lt: difficulty + 50,
                                      }
                                    : undefined,
                        },
                    },
                },
                orderBy: [
                    {
                        name: order === 'titleasc' ? 'asc' : 'desc',
                    },
                ],
                take: MUSICLIST_SIZE,
                skip: (page - 1) * MUSICLIST_SIZE,
                include: {
                    patterns: {
                        where: {
                            version: gameVersion,
                        },
                    },
                },
            })) as Music[];

            const displayData: MusicListPageData[] = [];

            for (const music of musicList) {
                // 가져온 음악목록에 대해 현재 버전에 맞추어 난이도 정보 가져오기
                const { id, name, composer, remove, version, patterns } = music;

                let skillList: Skill[] | undefined;
                if (userid) {
                    skillList = (await prisma.skillList.findMany({
                        where: {
                            uid: userid,
                            mid: id,
                            playver: gameVersion,
                        },
                    })) as Skill[];
                }

                const data: MusicListPageData = {
                    mid: id,
                    name,
                    composer,
                    remove,
                    version,
                    patterns: patterns ?? [],
                    skills: skillList ?? [],
                };
                // console.log(data);
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
