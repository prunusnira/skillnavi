import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { MusicModel } from '@/data/music/MusicModel';
import { PatternModel } from '@/data/pattern/PatternModel';
import {
    MusicListPage,
    MusicListPageData,
} from '@/data/music/MusicListPageData';
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { Music } from '@/data/music/Music';
import { Pattern } from '@/data/pattern/Pattern';
import { MUSICLIST_SIZE } from '@/data/env/constant';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;

            const version = searchParams.get('version');
            const order = searchParams.get('order');
            const page = Number(searchParams.get('page'));

            const musicCount = await MusicModel.count({
                where: {
                    version,
                },
            });

            // 현재 페이지의 음악 목록
            const musicList = (await MusicModel.findAll({
                where: {
                    version,
                },
                order: [
                    order === 'titleasc'
                        ? [
                              'name',
                              'asc',
                          ]
                        : [
                              'name',
                              'desc',
                          ],
                ],
                limit: MUSICLIST_SIZE,
                offset: (page - 1) * MUSICLIST_SIZE,
            })) as Model<
                InferAttributes<Music>,
                InferCreationAttributes<Music>
            >[];

            const displayData: MusicListPageData[] = [];

            for (const m of musicList) {
                // 가져온 음악목록에 대해 현재 버전에 맞추어 난이도 정보 가져오기
                const {
                    id,
                    name,
                    composer,
                    remove,
                    version: musicVer,
                } = m.dataValues;
                const patternList = (await PatternModel.findAll({
                    attributes: {
                        exclude: ['id'],
                    },
                    where: {
                        mid: id,
                        version,
                    },
                })) as Model<
                    InferAttributes<Pattern>,
                    InferCreationAttributes<Pattern>
                >[];
                const data: MusicListPageData = {
                    mid: id,
                    name,
                    composer,
                    remove,
                    version: musicVer,
                    patterns: patternList.map((p) => p.dataValues as Pattern),
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
