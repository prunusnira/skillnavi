import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { FetchError } from '@/lib/fetch/FetchError';
import { SkillTableData } from '@/feature/skill/data/SkillTableData';
import { SkillForTable } from '@/feature/skill/data/Skill';
import { Pattern } from '@/feature/music/data/Pattern';
import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { Music } from '@/feature/music/data/Music';
import {
    getQuerySkillAllDM,
    getQuerySkillAllGF,
    getQuerySkillTargetHotDM,
    getQuerySkillTargetHotGF,
    getQuerySkillTargetOtherDM,
    getQuerySkillTargetOtherGF,
} from '@/feature/skill/db/Skill.prisma';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;

            const pageType = searchParams.get('pageType');
            const userid = Number(searchParams.get('userid'));
            const version = Number(searchParams.get('version'));
            const game = searchParams.get('game') || '';
            const page = Number(searchParams.get('page'));
            // TODO: const order = searchParams.get('order') || 'skilldesc';

            if (!pageType) {
                throw new FetchError({
                    status: 500,
                    response: 'No Page Type Provided',
                });
            }

            const tableItems: SkillForTable[][] = [];
            let pages = 0;

            // 버전 전체 테이블 가져오기
            if (pageType === 'all') {
                let query;
                if (game === 'gf') {
                    query = getQuerySkillAllGF({ userid, version, page });
                } else {
                    query = getQuerySkillAllDM({ userid, version, page });
                }

                const skill = (await prisma.$queryRaw(
                    Prisma.sql`${query}`,
                )) as SkillForTable[];

                pages = await prisma.skillList.count({
                    where: {
                        uid: userid,
                        playver: version,
                        patterncode: game === 'gf' ? { lt: 9 } : { gt: 8 },
                    },
                });

                tableItems.push(skill);
            }

            // 스킬대상곡 가져오기
            if (pageType === 'target') {
                let hotQuery, otherQuery;
                if (game === 'gf') {
                    hotQuery = getQuerySkillTargetHotGF({ userid, version });
                    otherQuery = getQuerySkillTargetOtherGF({
                        userid,
                        version,
                    });
                } else {
                    hotQuery = getQuerySkillTargetHotDM({ userid, version });
                    otherQuery = getQuerySkillTargetOtherDM({
                        userid,
                        version,
                    });
                }

                const hot = (await prisma.$queryRaw(
                    Prisma.sql`${hotQuery}`,
                )) as SkillForTable[];

                const other = (await prisma.$queryRaw(
                    Prisma.sql`${otherQuery}`,
                )) as SkillForTable[];

                tableItems.push(hot);
                tableItems.push(other);
            }

            // exc 테이블
            if (pageType === 'exc') {
                const hot = (await prisma.$queryRaw(Prisma.sql`
                    select p.mid                        as mid,
                           p.version                    as playver,
                           p.patterncode                as patterncode,
                           p.level                      as level,
                           'SS'                         as maxrank,
                           10000                        as rate,
                           1                            as fc,
                           1                            as hot,
                           p.level * 10000 * 20 / 10000 as skill
                    from PatternList p
                             inner join (select mid, max(pl.level) as level, hot, hot_end, ver
                                         from PatternList pl
                                                  inner join (select id, hot, hot_end, version as ver
                                                              from MusicList) ml
                                                             on pl.mid = ml.id and hot <= ${version} and
                                                                hot_end >= ${version} and ml.ver = ${version}
                                         where ${game === 'gf' ? `patterncode < 9` : `patterncode > 8`}
                                         group by mid) list
                                        on p.level = list.level and p.mid = list.mid and p.version = list.ver and
                                           ${game === 'gf' ? `p.patterncode < 9` : `p.patterncode > 8`}
                    order by level desc limit 25
                `)) as SkillForTable[];

                const other = (await prisma.$queryRaw(Prisma.sql`
                    select p.mid                        as mid,
                           p.version                    as playver,
                           p.patterncode                as patterncode,
                           p.level                      as level,
                           'SS'                         as maxrank,
                           10000                        as rate,
                           1                            as fc,
                           0                            as hot,
                           p.level * 10000 * 20 / 10000 as skill
                    from PatternList p
                             inner join (select mid, max(pl.level) as level, hot, hot_end, ver
                                         from PatternList pl
                                                  inner join (select id, hot, hot_end, version as ver
                                                              from MusicList) ml
                                                             on pl.mid = ml.id and hot > ${version} and
                                                                hot_end < ${version} and ml.ver = ${version}
                                         where ${game === 'gf' ? `patterncode < 9` : `patterncode > 8`}
                                         group by mid) list
                                        on p.level = list.level and p.mid = list.mid and p.version = list.ver and
                                           ${game === 'gf' ? `p.patterncode < 9` : `p.patterncode > 8`}
                    order by level desc limit 25
                `)) as SkillForTable[];

                tableItems.push(hot);
                tableItems.push(other);
            }

            if (!tableItems.length) {
                throw new FetchError({
                    status: 500,
                    response: 'Skill common error',
                });
            }

            const midList: number[] = [];
            tableItems.forEach((table) =>
                table.forEach((skill) => {
                    midList.push(skill.mid);
                }),
            );

            const musiclist = (await prisma.musicList.findMany({
                where: {
                    OR: midList.map((mid) => ({
                        id: mid,
                    })),
                },
            })) as Music[];

            const patternInfo: Promise<Pattern | null>[] = [];

            // promise 객체를 처리하기 위해 map으로 사용
            tableItems.map(async (skillSet) => {
                skillSet.map(async (skill) => {
                    const pattern = prisma.patternList.findFirst({
                        where: {
                            mid: skill.mid,
                            patterncode: skill.patterncode,
                            version: skill.playver,
                        },
                    }) as Promise<Pattern>;
                    patternInfo.push(pattern);
                });
            });

            const patternlist = await Promise.all(patternInfo);

            const result: SkillTableData[][] = [];
            tableItems.forEach((skillSet) => {
                const list: SkillTableData[] = [];
                skillSet.forEach((s) => {
                    const music = musiclist.find((m) => m.id === s.mid);
                    const pattern = patternlist.find(
                        (p) =>
                            p &&
                            p.mid === s.mid &&
                            p.patterncode === s.patterncode,
                    );

                    if (music && pattern) {
                        list.push({
                            ...s,
                            music,
                            pattern,
                        });
                    }
                });
                result.push(list);
            });

            return NextResponse.json({ data: result, pages });
        },
    });
};
