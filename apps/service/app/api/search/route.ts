import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
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
            const preview = searchParams.get('preview') === 'true';

            if (!type || !value) {
                return NextResponse.json({ detail: 'failed' }, { status: 400 });
            }

            const musicWhere: Prisma.MusicListWhereInput = {
                OR: [
                    { name: { contains: value } },
                    { furigana: { contains: value } },
                    { composer: { contains: value } },
                    { search_korean: { contains: value } },
                ],
            };

            if (type === 'music' && preview) {
                const musicList = await prisma.musicList.findMany({
                    where: musicWhere,
                    select: {
                        id: true,
                        name: true,
                        composer: true,
                        version: true,
                        remove: true,
                    },
                    orderBy: {
                        name: 'asc',
                    },
                    take: MUSICLIST_SIZE,
                });

                const list: MusicListPageData[] = musicList.map((music) => ({
                    mid: music.id,
                    name: music.name ?? '',
                    composer: music.composer ?? '',
                    version: music.version ?? 0,
                    remove: music.remove ?? 0,
                    patterns: [],
                    skills: [],
                }));

                return NextResponse.json({ list, page: 1 });
            }

            const latest = await getLatestVersion();

            let count: number = 0;
            let result: MusicListPageData[] | Recent[] | undefined;

            if (type === 'music') {
                count = await prisma.musicList.count({
                    where: musicWhere,
                });

                const musicList = await prisma.musicList.findMany({
                    where: musicWhere,
                    take: MUSICLIST_SIZE,
                    skip: (page - 1) * MUSICLIST_SIZE,
                });

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
                        name: name ?? '',
                        composer: composer ?? '',
                        remove: remove ?? 0,
                        version: musicVer ?? 0,
                        patterns: patternList,
                        skills: [],
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
