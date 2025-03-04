import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import prisma from '@/module/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { PlayCountResponse } from '@/component/playcount/PlayCount.type';
import { getLatestVersion } from '@/module/api/env/getGameVersions';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const type = searchParams.get('type') || 'music';
            const id = Number(searchParams.get('id'));

            const latest = await getLatestVersion();

            let result;

            if (type === 'music') {
                result = (await prisma.$queryRaw(Prisma.sql`
                    SELECT m.id        as id,
                           m.name      as name,
                           s.playcount as playcount
                    FROM MusicList m
                             INNER JOIN (SELECT mid, SUM(playcount) AS playcount
                                         FROM SkillList
                                         WHERE uid = ${id}
                                           and playcount > 0
                                           and playver = ${latest}
                                         GROUP BY mid) s ON m.id = s.mid
                    ORDER BY s.playcount DESC LIMIT 50
                `)) as PlayCountResponse[];
            } else if (type === 'gf') {
                result = (await prisma.$queryRaw(Prisma.sql`
                    SELECT m.id          as id,
                           m.name        as name,
                           s.patterncode as patterncode,
                           s.playcount   as playcount
                    FROM MusicList m
                             INNER JOIN (SELECT mid, playcount, patterncode
                                         FROM SkillList
                                         WHERE uid = ${id}
                                           and playcount > 0
                                           and playver = ${latest}
                                           and patterncode < 9
                                         GROUP BY mid) s ON m.id = s.mid
                    ORDER BY s.playcount DESC LIMIT 50
                `)) as PlayCountResponse[];
            } else if (type === 'dm') {
                result = (await prisma.$queryRaw(Prisma.sql`
                    SELECT m.id          as id,
                           m.name        as name,
                           s.patterncode as patterncode,
                           s.playcount   as playcount
                    FROM MusicList m
                             INNER JOIN (SELECT mid, playcount, patterncode
                                         FROM SkillList
                                         WHERE uid = ${id}
                                           and playcount > 0
                                           and playver = ${latest}
                                           and patterncode > 8
                                         GROUP BY mid) s ON m.id = s.mid
                    ORDER BY s.playcount DESC LIMIT 50
                `)) as PlayCountResponse[];
            } else {
                result = (await prisma.$queryRaw(Prisma.sql`
                    SELECT m.id          as id,
                           m.name        as name,
                           s.patterncode as patterncode,
                           s.playcount   as playcount
                    FROM MusicList m
                             INNER JOIN (SELECT mid, playcount, patterncode
                                         FROM SkillList
                                         WHERE uid = ${id}
                                           and playcount > 0
                                           and playver = ${latest}
                                         GROUP BY mid) s ON m.id = s.mid
                    ORDER BY s.playcount DESC LIMIT 50
                `)) as PlayCountResponse[];
            }

            return NextResponse.json(result);
        },
    });
};
