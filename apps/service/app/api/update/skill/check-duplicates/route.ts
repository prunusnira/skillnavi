import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import { ALBUM } from '@/url/url';
import {
    MusicDuplicateGroup,
    MusicDuplicateCandidate,
} from '@skillnavi/data/src/skill/SkillData';

interface CheckDuplicatesRequest {
    version: number;
    titles: string[];
}

interface RegisteredPattern {
    patterncode: number;
    level: number | null;
    version: number;
}

const getLatestPatterns = (patterns: RegisteredPattern[]) => {
    const latestByPattern = new Map<number, RegisteredPattern>();

    patterns.forEach((pattern) => {
        if (!latestByPattern.has(pattern.patterncode)) {
            latestByPattern.set(pattern.patterncode, pattern);
        }
    });

    return [...latestByPattern.values()].sort(
        (left, right) => left.patterncode - right.patterncode,
    );
};

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const body = (await req.json()) as CheckDuplicatesRequest;

            if (
                !Number.isInteger(body.version) ||
                !Array.isArray(body.titles) ||
                !body.titles.every((title) => typeof title === 'string')
            ) {
                return NextResponse.json([], { status: 400 });
            }

            const { version, titles } = body;
            const uniqueTitles = [...new Set(titles)];

            if (uniqueTitles.length === 0) {
                return NextResponse.json([]);
            }

            const albumBase = ALBUM.replace(/\/$/, '');
            const matchingRows = await prisma.musicList.findMany({
                where: {
                    name: { in: uniqueTitles },
                },
                include: {
                    patterns: {
                        where: { version: { lte: version } },
                        orderBy: [{ version: 'desc' }, { patterncode: 'asc' }],
                        select: {
                            patterncode: true,
                            level: true,
                            version: true,
                        },
                    },
                },
            });

            const conflicts: MusicDuplicateGroup[] = [];

            uniqueTitles.forEach((title) => {
                // MySQL collations may compare strings without case sensitivity.
                // Filter in JavaScript so only exact title matches are grouped.
                const matchingTitles = matchingRows.filter(
                    (music) => music.name === title,
                );

                if (matchingTitles.length < 2) {
                    return;
                }

                const candidates: MusicDuplicateCandidate[] =
                    matchingTitles.map((music) => ({
                        mid: music.id,
                        title: music.name ?? title,
                        composer: music.composer ?? '',
                        patterns: getLatestPatterns(music.patterns).map(
                            ({ patterncode, level }) => ({
                                patterncode,
                                level,
                            }),
                        ),
                        jacketUrl: albumBase
                            ? `${albumBase}/${music.id}.jpg`
                            : null,
                    }));

                conflicts.push({ title, candidates });
            });

            return NextResponse.json(conflicts);
        },
    });
};
