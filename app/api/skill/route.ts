import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { FetchError } from '@/data/fetch/FetchError';
import { SkillTableData } from '@/data/skill/SkillTableData';
import { Skill } from '@/data/skill/Skill';
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

            const tableItems: Skill[][] = [];
            let pages = 0;

            // 버전 전체 테이블 가져오기
            if (pageType === 'all') {
                const skill = (await prisma.$queryRaw(Prisma.sql`
                    select *
                    from SkillList
                    where uid = ${userid}
                      and playver = ${version}
                      and patterncode${game === 'gf' ? '<9' : '>8'}
                    order by level * rate desc
                    offset ${(page - 1) * SKILL_SIZE} limit ${SKILL_SIZE}
                `)) as Skill[];

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
                    select *
                    from SkillList
                    where uid = ${userid}
                      and playver = ${version}
                      and patterncode${game === 'gf' ? '<9' : '>8'}
                      and hot = 1
                    order by level * rate desc limit 25
                `)) as Skill[];

                const other = (await prisma.$queryRaw(Prisma.sql`
                    select *
                    from SkillList
                    where uid = ${userid}
                      and playver = ${version}
                      and patterncode${game === 'gf' ? '<9' : '>8'}
                      and hot = 0
                    order by level * rate desc limit 25
                `)) as Skill[];

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
