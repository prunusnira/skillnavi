import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import prisma from '@/lib/db/prisma';
import { Music } from '@/feature/music/data/Music';
import { Pattern } from '@/feature/music/data/Pattern';
import { Skill } from '@/feature/skill/data/Skill';
import { MusicSkill, UpdateSkill } from '@skillnavi/data/src/skill/SkillData';

interface PatternPromiseData {
    mid: number;
    patterncode: number;
    level: number | null;
    version: number;
}

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            // const { musicdata, version, uid } =
            const result = (await req.json()) as UpdateSkill;

            const { musicData, version, uid } = result;

            const updateMusicData = async (musictitle: string) => {
                // 현재 음악이 존재하는 음악인지 확인
                const count = await prisma.musicList.count({
                    where: {
                        name: musictitle,
                    },
                });

                // TODO: 동일한 이름을 가진 곡이 2개 이상이라니 조졌다!
                // if (count > 1) {
                //     /**
                //      * @note
                //      * 곡 정보가 2개 이상일 때 대처법
                //      * 1. 임시 테이블에 넣는다
                //      * 2. 패턴 정보를 대조한다
                //      * 3. 데이터를 넣는다
                //      *
                //      * 일단은 스킵함...
                //      */
                //     return NextResponse.json({ result: 'failure' });
                // }

                // 음악 데이터가 없어서 새로 등록해야 하는 경우
                if (count === 0) {
                    const latest = await getLatestVersion();
                    await prisma.musicList.create({
                        data: {
                            name: musictitle,
                            version: latest,
                            furigana: '',
                            composer: '',
                            hot: latest,
                            hot_end: latest,
                            remove: 0,
                        },
                    });
                }

                return (await prisma.musicList.findFirst({
                    where: {
                        name: musictitle,
                    },
                })) as Music;
            };

            const updatePatternData = (
                skill: MusicSkill,
                music?: Music,
            ) => {
                if (!music) {
                    return undefined;
                }

                // 패턴 데이터 등록
                // 현재 패턴 정보를 가져와서 데이터 비교 수행

                const patternArray: Pattern[] = [];

                skill.data.forEach((pattern) => {
                    patternArray.push({
                        mid: music.id,
                        version,
                        patterncode: pattern.ptcode,
                        level: pattern.level,
                    });
                });

                // 패턴 데이터 갱신처리
                return patternArray.map(
                    async (pattern) =>
                        await prisma.patternList.upsert({
                            where: {
                                mid_version_paterncode: {
                                    mid: music.id,
                                    version,
                                    patterncode: pattern.patterncode,
                                },
                            },
                            create: pattern,
                            update: pattern,
                        }),
                );
            };

            const updateSkillData = async (
                skill: MusicSkill,
                music?: Music,
            ) => {
                if (!music) {
                    return undefined;
                }

                const skillArray: Skill[] = [];

                skill.data.forEach((pattern) => {
                    // 성과데이터 갱신처리
                    const {
                        rate,
                        clearcount,
                        clearstat,
                        combo,
                        meter,
                        rank,
                        playcount,
                        ptcode,
                    } = pattern;
                    if (rate !== '-' && rate !== 'NO') {
                        // 달성률
                        let rateNum = 0;
                        if (
                            rate === 'MAX' ||
                            rate === '100' ||
                            rate === '100.00'
                        ) {
                            rateNum = 10000;
                        } else {
                            rateNum = Number(
                                rate.replace('.', '').replace('%', ''),
                            );
                        }

                        // 풀콤여부
                        let fc = false;
                        if (clearstat === 'FULL' || clearstat === 'EXCELLENT') {
                            fc = true;
                        }

                        const skill: Skill = {
                            uid,
                            mid: music.id,
                            playver: version,
                            patterncode: ptcode,
                            level: pattern.level,
                            playcount,
                            clearcount,
                            maxrank: rank,
                            combo,
                            meter,
                            rate: rateNum,
                            fc,
                            hot:
                                version >= music.hot &&
                                version <= music.hot_end,
                            skill: rateNum * pattern.level * 2,
                        };

                        skillArray.push(skill);
                    }
                });

                return skillArray.map(async (skill) => {
                    const { playver, patterncode, mid } = skill;
                    return prisma.skillList.upsert({
                        where: {
                            uid_playver_patterncode_mid: {
                                uid,
                                playver,
                                patterncode,
                                mid,
                            },
                        },
                        create: skill,
                        update: skill,
                    });
                });
            };

            // 음악 데이터 처리
            const musicPromise = await Promise.allSettled(
                musicData.map((music) => updateMusicData(music.musictitle)),
            );

            const musicArray: Music[] = [];
            musicPromise.forEach((p) => {
                if (p.status === 'fulfilled') {
                    musicArray.push(p.value);
                }
            });

            // 패턴 데이터 처리
            const patternPromise = await Promise.allSettled(
                musicData.map((music) =>
                    updatePatternData(
                        music,
                        musicArray.find((m) => m.name === music.musictitle),
                    ),
                ),
            );

            const patternInnerPromise: Promise<PatternPromiseData>[] = [];

            patternPromise.forEach((p) => {
                if (p.status === 'fulfilled' && p.value) {
                    patternInnerPromise.push(...p.value);
                }
            });

            await Promise.allSettled(patternInnerPromise);

            // 스킬 데이터 가져오기
            const skillPromises = await Promise.allSettled(
                musicData.map((skill) =>
                    updateSkillData(
                        skill,
                        musicArray.find((m) => m.name === skill.musictitle),
                    ),
                ),
            );

            const skillInnerPromise: Promise<any>[] = [];

            skillPromises.forEach((p) => {
                if (p.status === 'fulfilled' && p.value) {
                    skillInnerPromise.push(...p.value);
                }
            });

            const totalResult = await Promise.allSettled(skillInnerPromise);

            const success = totalResult.every((r) => r.status === 'fulfilled');

            return NextResponse.json({
                result: success ? 'success' : 'failure',
            });
        },
    });
};
