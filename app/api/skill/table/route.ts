import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { FetchError } from '@/data/fetch/FetchError';
import { SkillTableData } from '@/data/skill/SkillTableData';
import { SkillForTable } from '@/data/skill/Skill';
import { Pattern } from '@/data/pattern/Pattern';
import { SKILL_SIZE } from '@/data/env/constant';
import prisma from '@/module/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { Music } from '@/data/music/Music';

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
                const skill = (await prisma.$queryRaw(Prisma.sql`
                    select mid,
                           playver,
                           patterncode,
                           level,
                           maxrank,
                           rate,
                           fc,
                           hot,
                           level * rate as skill
                    from SkillList
                    where uid = ${userid}
                      and playver = ${version}
                      and patterncode${game === 'gf' ? '<9' : '>8'}
                    order by level * rate desc
                    offset ${(page - 1) * SKILL_SIZE} limit ${SKILL_SIZE}
                `)) as SkillForTable[];

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
                const hot = (await prisma.$queryRaw(Prisma.sql`
                    select s1.mid as mid,
                           playver,
                           patterncode,
                           level,
                           maxrank,
                           rate,
                           fc,
                           hot,
                           skill
                    from SkillList s1
                             inner join(select mid,
                                               max(level * rate * 20 / 10000) as skill
                                        from SkillList
                                        where uid = ${userid}
                                          and playver = ${version}
                                          and hot = 1
                                        group by mid) s2
                                       on s1.mid = s2.mid and (s1.level * s1.rate * 20 / 10000) = s2.skill
                    where s1.uid = ${userid}
                      and s1.playver = ${version}
                      and s1.hot = 1
                    order by s1.level * s1.rate desc limit 25
                `)) as SkillForTable[];

                const other = (await prisma.$queryRaw(Prisma.sql`
                    select s1.mid as mid,
                           playver,
                           patterncode,
                           level,
                           maxrank,
                           rate,
                           fc,
                           hot,
                           skill
                    from SkillList s1
                             inner join(select mid,
                                               max(level * rate * 20 / 10000) as skill
                                        from SkillList
                                        where uid = ${userid}
                                          and playver = ${version}
                                          and hot = 0
                                        group by mid) s2
                                       on s1.mid = s2.mid and (s1.level * s1.rate * 20 / 10000) = s2.skill
                    where s1.uid = ${userid}
                      and s1.playver = ${version}
                      and s1.hot = 0
                    order by s1.level * s1.rate desc limit 25
                `)) as SkillForTable[];

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
                                                             on pl.mid = ml.id and hot <= ${version} and hot_end >= ${version} and ml.ver = ${version}
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
                                                             on pl.mid = ml.id and hot > ${version} and hot_end < ${version} and ml.ver = ${version}
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
                    response: 'Skill data error',
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
