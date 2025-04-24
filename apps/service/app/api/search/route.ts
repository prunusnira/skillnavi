import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { Music } from '@/feature/music/data/Music';
import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import { MusicListPageData } from '@/feature/music/data/MusicListPageData';
import { Pattern } from '@/feature/music/data/Pattern';
import { Recent } from '@/feature/recent/data/Recent';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const type = searchParams.get('type');
            const value = searchParams.get('value');
            const page = Number(searchParams.get('page'));
            const latest = await getLatestVersion();

            if (!type || !value) {
                return NextResponse.json({ detail: 'failed' }, { status: 400 });
            }

            let count: number = 0;
            let result: MusicListPageData[] | Recent[] | undefined;

            if (type === 'music') {
                count = await prisma.musicList.count({
                    where: {
                        name: {
                            contains: value,
                        },
                    },
                });

                const musicList = (await prisma.musicList.findMany({
                    where: {
                        name: {
                            contains: value,
                        },
                    },
                    take: MUSICLIST_SIZE,
                    skip: (page - 1) * MUSICLIST_SIZE,
                })) as Music[];

                const display: MusicListPageData[] = [];

                for (const music of musicList) {
                    // 가져온 음악목록에 대해 현재 버전에 맞추어 난이도 정보 가져오기
                    const {
                        id,
                        name,
                        composer,
                        remove,
                        version: musicVer,
                    } = music;

                    const patternList = (await prisma.patternList.findMany({
                        where: {
                            mid: id,
                            version: latest,
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
                        display.push(data);
                    }
                }

                result = [...display];
            }

            if (type === 'player') {
                count = await prisma.profileList.count({
                    where: {
                        name: {
                            contains: value,
                        },
                    },
                });

                const like = `%${value}%`;

                result = (await prisma.$queryRaw(Prisma.sql`
                    select titletower,
                           id,
                           name,
                           gskill,
                           dskill,
                           lastupdate,
                           openinfo
                    from ProfileSkill ps
                             inner join (select *
                                         from ProfileList
                                         where name like ${like}) pl
                                        on pl.id = ps.uid and ps.version = ${latest} limit ${MUSICLIST_SIZE}
                    offset ${(page - 1) * MUSICLIST_SIZE}
                `)) as Recent[];
            }

            if (type === 'gfskill') {
                const skillValue = Number(value);

                const queryCount = (await prisma.$queryRaw(Prisma.sql`
                    select count(*) as count
                    from ProfileList pl
                        inner join (select *
                        from ProfileSkill
                        where gskill >= ${skillValue * 100} - 100000
                        and gskill <= ${skillValue * 100} + 100000) ps
                    on pl.id = ps.uid and ps.version = ${latest}
                `)) as { count: bigint }[];

                count = Number(queryCount?.[0]?.count) ?? 0;

                result = (await prisma.$queryRaw(Prisma.sql`
                    select titletower,
                           id,
                           name,
                           gskill,
                           dskill,
                           lastupdate,
                           openinfo
                    from ProfileList pl
                             inner join (select *
                                         from ProfileSkill
                                         where gskill >= ${skillValue * 100} - 100000
                                           and gskill <= ${skillValue * 100} + 100000) ps
                                        on pl.id = ps.uid and ps.version = ${latest} limit ${MUSICLIST_SIZE}
                    offset ${(page - 1) * MUSICLIST_SIZE}
                `)) as Recent[];
            }

            if (type === 'dmskill') {
                const skillValue = Number(value);

                const queryCount = (await prisma.$queryRaw(Prisma.sql`
                    select count(*) as count
                    from ProfileList pl
                        inner join (select *
                        from ProfileSkill
                        where dskill >= ${skillValue * 100} - 100000
                        and dskill <= ${skillValue * 100} + 100000) ps
                    on pl.id = ps.uid and ps.version = ${latest}
                `)) as { count: bigint }[];

                count = Number(queryCount?.[0]?.count) ?? 0;

                result = (await prisma.$queryRaw(Prisma.sql`
                    select titletower,
                           id,
                           name,
                           gskill,
                           dskill,
                           lastupdate,
                           openinfo
                    from ProfileList pl
                             inner join (select *
                                         from ProfileSkill
                                         where dskill >= ${skillValue * 100} - 100000
                                           and dskill <= ${skillValue * 100} + 100000) ps
                                        on pl.id = ps.uid and ps.version = ${latest} limit ${MUSICLIST_SIZE}
                    offset ${(page - 1) * MUSICLIST_SIZE}
                `)) as Recent[];
            }

            return NextResponse.json({
                list: result,
                page: Math.ceil(count / MUSICLIST_SIZE),
            });
        },
    });
};
