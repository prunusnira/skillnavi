import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { VER_TB } from '@/feature/env/data/constant';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import { PatternDifficultyCompareResult } from '@/feature/music/data/PatternDifficultyCompare';

const COMPARE_PAGE_SIZE = 30;

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const version1 = Number(searchParams.get('version1'));
            const version2 = Number(searchParams.get('version2'));
            const requestedPage = Number(searchParams.get('page'));
            const value = searchParams.get('value')?.trim() ?? '';
            const sort =
                searchParams.get('sort') === 'difference'
                    ? 'difference'
                    : 'song';

            if (
                !Number.isInteger(version1) ||
                !Number.isInteger(version2) ||
                version1 <= 0 ||
                version2 <= 0 ||
                version1 === version2
            ) {
                return NextResponse.json(
                    { detail: 'Two different game versions are required.' },
                    { status: 400 },
                );
            }

            const availableVersions = await prisma.gameVersion.findMany({
                where: {
                    id: {
                        in: [version1, version2],
                        gte: VER_TB,
                    },
                },
                select: {
                    id: true,
                },
            });

            if (availableVersions.length !== 2) {
                return NextResponse.json(
                    { detail: 'A selected game version was not found.' },
                    { status: 400 },
                );
            }

            const conditions: Prisma.MusicListWhereInput[] = [
                {
                    patterns: {
                        some: {
                            version: version1,
                            level: {
                                gt: 0,
                            },
                        },
                    },
                },
                {
                    patterns: {
                        some: {
                            version: version2,
                            level: {
                                gt: 0,
                            },
                        },
                    },
                },
            ];

            if (value) {
                conditions.push({
                    OR: [
                        { name: { contains: value } },
                        { furigana: { contains: value } },
                        { composer: { contains: value } },
                        { search_korean: { contains: value } },
                    ],
                });
            }

            const where: Prisma.MusicListWhereInput = {
                AND: conditions,
            };
            const musicList = await prisma.musicList.findMany({
                where,
                orderBy: [{ name: 'asc' }, { id: 'asc' }],
                select: {
                    id: true,
                    name: true,
                },
            });

            const mids = musicList.map((music) => music.id);
            const patternList = mids.length
                ? await prisma.patternList.findMany({
                      where: {
                          mid: {
                              in: mids,
                          },
                          version: {
                              in: [version1, version2],
                          },
                          level: {
                              gt: 0,
                          },
                      },
                      select: {
                          mid: true,
                          patterncode: true,
                          version: true,
                          level: true,
                      },
                      orderBy: [{ mid: 'asc' }, { patterncode: 'asc' }],
                  })
                : [];

            const patternByMusic = new Map<
                number,
                Map<
                    number,
                    {
                        version1Level: number | null;
                        version2Level: number | null;
                    }
                >
            >();

            patternList.forEach((pattern) => {
                const patterns =
                    patternByMusic.get(pattern.mid) ??
                    new Map<
                        number,
                        {
                            version1Level: number | null;
                            version2Level: number | null;
                        }
                    >();
                const levels = patterns.get(pattern.patterncode) ?? {
                    version1Level: null,
                    version2Level: null,
                };

                if (pattern.version === version1) {
                    levels.version1Level = pattern.level;
                } else if (pattern.version === version2) {
                    levels.version2Level = pattern.level;
                }

                patterns.set(pattern.patterncode, levels);
                patternByMusic.set(pattern.mid, patterns);
            });

            const rows: PatternDifficultyCompareResult['rows'] =
                musicList.flatMap((music) => {
                    const patterns = patternByMusic.get(music.id);
                    if (!patterns) {
                        return [];
                    }

                    return Array.from(patterns.entries())
                        .sort(([left], [right]) => left - right)
                        .flatMap(([patterncode, levels]) => {
                            const version1Level = levels.version1Level;
                            const version2Level = levels.version2Level;
                            if (
                                version1Level === null ||
                                version2Level === null
                            ) {
                                return [];
                            }

                            const difference = version1Level - version2Level;
                            if (difference === 0) {
                                return [];
                            }

                            return [
                                {
                                    mid: music.id,
                                    name: music.name ?? '',
                                    patterncode,
                                    version1Level,
                                    version2Level,
                                    difference,
                                },
                            ];
                        });
                });

            const songOrder = new Map(
                musicList.map((music, index) => [music.id, index]),
            );
            rows.sort((left, right) => {
                if (sort === 'difference') {
                    const differenceOrder =
                        Math.abs(right.difference ?? 0) -
                        Math.abs(left.difference ?? 0);
                    if (differenceOrder !== 0) {
                        return differenceOrder;
                    }
                }

                return (
                    (songOrder.get(left.mid) ?? 0) -
                        (songOrder.get(right.mid) ?? 0) ||
                    left.patterncode - right.patterncode
                );
            });

            const count = rows.length;
            const pages = Math.ceil(count / COMPARE_PAGE_SIZE);
            const page =
                Number.isInteger(requestedPage) && requestedPage > 0
                    ? Math.min(requestedPage, Math.max(pages, 1))
                    : 1;
            const pageRows = rows.slice(
                (page - 1) * COMPARE_PAGE_SIZE,
                page * COMPARE_PAGE_SIZE,
            );
            const result: PatternDifficultyCompareResult = {
                count,
                pages,
                page,
                rows: pageRows,
            };

            return NextResponse.json(result);
        },
    });
};
