import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { FetchError } from '@/lib/fetch/FetchError';
import {
    SkillDataForOneTable,
    SkillForTable,
    SkillForTableWithInfo,
    SkillTableData,
} from '@/feature/skill/data/Skill';
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
    getQuerySkillTargetOtherGF, getSkillExcDMHot, getSkillExcDMOther, getSkillExcGFHot, getSkillExcGFOther,
} from '@/feature/skill/db/Skill.prisma';

export const dynamic = 'force-dynamic';

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

            const tableItems: SkillDataForOneTable[] = [];
            let pages = 0;

            // 버전 전체 테이블 가져오기
            if (userid !== 0 && pageType === 'all') {
                let query;
                if (game === 'gf') {
                    query = getQuerySkillAllGF({ userid, version, page });
                } else {
                    query = getQuerySkillAllDM({ userid, version, page });
                }

                const skill = (await prisma.$queryRaw(
                    Prisma.sql`${query}`,
                )) as SkillForTable[];

                skill.map((s) => {
                    s.skill = Math.floor(s.skill / 1000);
                    return s;
                });

                pages = await prisma.skillList.count({
                    where: {
                        uid: userid,
                        playver: version,
                        patterncode: game === 'gf' ? { lt: 9 } : { gt: 8 },
                    },
                });

                tableItems.push({ data: skill });
            }

            // 스킬대상곡 가져오기
            if (userid !== 0 && pageType === 'target') {
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

                hot.map((hskill) => {
                    hskill.skill = Math.floor(hskill.skill / 1000);
                    return hskill;
                });

                other.map((oskill) => {
                    oskill.skill = Math.floor(oskill.skill / 1000);
                    return oskill;
                });

                tableItems.push({ title: 'HOT', data: hot });
                tableItems.push({ title: 'OTHER', data: other });
            }

            // exc 테이블
            if (pageType === 'exc') {
                let hotQuery;
                let otherQuery;
                if (game === 'gf') {
                    hotQuery = getSkillExcGFHot(version);
                    otherQuery = getSkillExcGFOther(version);
                } else {
                    hotQuery = getSkillExcDMHot(version);
                    otherQuery = getSkillExcDMOther(version);
                }

                const hot = (await prisma.$queryRaw(Prisma.sql`${hotQuery}`)) as SkillForTable[];
                const other = (await prisma.$queryRaw(Prisma.sql`${otherQuery}`)) as SkillForTable[];

                tableItems.push({ title: 'HOT', data: hot.map(item => ({ ...item, skill: Number(item.skill) })) });
                tableItems.push({ title: 'OTHER', data: other.map(item => ({ ...item, skill: Number(item.skill) })) });
            }

            if (!tableItems.length) {
                throw new FetchError({
                    status: 500,
                    response: 'Skill common error',
                });
            }

            const midList: number[] = [];
            tableItems.forEach((table) =>
                table.data.forEach((skill) => {
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
                skillSet.data.map(async (skill) => {
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

            const result: SkillTableData[] = [];
            tableItems.map((skillSet) => {
                const list: SkillForTableWithInfo[] = [];
                skillSet.data.forEach((s) => {
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
                result.push({
                    title: skillSet.title,
                    data: list,
                });
            });

            return NextResponse.json({ data: result, pages });
        },
    });
};
