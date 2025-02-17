import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { GameType } from '@/data/game/GameType';
import prisma from '@/module/lib/db/prisma';
import { SKILLRANK_SIZE } from '@/data/env/constant';
import { SkillRank } from '@/data/skill/SkillRank';
import { ProfileSkill } from '@/data/profile/ProfileSkill';
// import { getLatestVersion } from '@/module/api/env/getGameVersions';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const page = Number(searchParams.get('page'));
            const type: GameType = searchParams.get('type') as GameType;
            // const latest = await getLatestVersion();

            let skillData;
            let total;
            if (type === 'gf') {
                skillData = (await prisma.profileSkill.findMany({
                    where: {
                        version: 28,
                        gskill: {
                            gt: 0,
                        },
                    },
                    orderBy: {
                        gskill: 'desc',
                    },
                    skip: (page - 1) * SKILLRANK_SIZE,
                    take: SKILLRANK_SIZE,
                })) as ProfileSkill[];
                total = await prisma.profileSkill.count({
                    where: {
                        version: 28,
                        gskill: {
                            gt: 0,
                        },
                    },
                });
            } else {
                skillData = (await prisma.profileSkill.findMany({
                    where: {
                        version: 28,
                        dskill: {
                            gt: 0,
                        },
                    },
                    orderBy: {
                        dskill: 'desc',
                    },
                    skip: (page - 1) * SKILLRANK_SIZE,
                    take: SKILLRANK_SIZE,
                })) as ProfileSkill[];
                total = await prisma.profileSkill.count({
                    where: {
                        version: 28,
                        dskill: {
                            gt: 0,
                        },
                    },
                });
            }

            let pages;
            if (total % SKILLRANK_SIZE === 0) {
                pages = total / SKILLRANK_SIZE;
            } else {
                pages = Math.floor(total / SKILLRANK_SIZE + 1);
            }

            const userIds = skillData.map((data) => data.uid);
            const profileList = await prisma.profileList.findMany({
                select: {
                    id: true,
                    name: true,
                    openinfo: true,
                },
                where: {
                    OR: userIds.map((id) => ({
                        id,
                    })),
                },
            });

            const rank: SkillRank[] = [];

            skillData.forEach((data) => {
                const prof = profileList.find((p) => p.id === data.uid);
                const name = prof?.openinfo ? prof.name : '';

                rank.push({
                    uid: prof?.openinfo ? data.uid : 0,
                    name: name || '',
                    value: type === 'gf' ? data.gskill || 0 : data.dskill || 0,
                });
            });

            return NextResponse.json({
                rank,
                pages,
            });
        },
    });
};
