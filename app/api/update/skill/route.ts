import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { UpdateSkillInfo } from '@/data/update/UpdateSkillInfo';
import { getLatestVersion } from '@/module/api/env/getGameVersions';
import prisma from '@/module/lib/db/prisma';
import { Music } from '@/data/music/Music';
import { Pattern } from '@/data/pattern/Pattern';
import { Skill } from '@/data/skill/Skill';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const { musictitle, version, uid, data } =
                (await req.json()) as UpdateSkillInfo;

            // 현재 음악이 존재하는 음악인지 확인
            const count = await prisma.musicList.count({
                where: {
                    name: musictitle,
                },
            });

            // TODO: 동일한 이름을 가진 곡이 2개 이상이라니 조졌다!
            if (count > 1) {
                /**
                 * @note
                 * 곡 정보가 2개 이상일 때 대처법
                 * 1. 임시 테이블에 넣는다
                 * 2. 패턴 정보를 대조한다
                 * 3. 데이터를 넣는다
                 */
            }

            // 음악 데이터가 없어서 새로 등록해야 하는 경우
            if (count === 0) {
                const version = await getLatestVersion();
                await prisma.musicList.create({
                    data: {
                        name: musictitle,
                        version,
                        furigana: '',
                        composer: '',
                        hot: 1,
                        remove: 0,
                    },
                });
            }

            // 패턴 데이터 등록
            // 현재 패턴 정보를 가져와서 데이터 비교 수행

            // mid와 갱신 버전에 대해 곡 정보 및 패턴 정보를 가져옴
            const music = (await prisma.musicList.findFirst({
                where: {
                    name: musictitle,
                },
            })) as Music;

            data.forEach((pattern) => {
                const patternToBeUpdated: Pattern = {
                    mid: music.id,
                    version,
                    patterncode: pattern.ptcode,
                    level: pattern.level,
                };

                // 패턴 데이터 갱신처리
                prisma.patternList.upsert({
                    where: {
                        mid_version_paterncode: {
                            mid: music.id,
                            version,
                            patterncode: pattern.ptcode,
                        },
                    },
                    create: patternToBeUpdated,
                    update: patternToBeUpdated,
                });

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
                    if (rate === 'MAX' || rate === '100' || rate === '100.00') {
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
                        hot: music.hot,
                        skill: Math.floor(
                            (rateNum * pattern.level * 20) / 10000,
                        ),
                    };

                    // 데이터 추가 혹은 갱신
                    prisma.skillList.upsert({
                        where: {
                            uid_playver_patterncode_mid: {
                                uid,
                                playver: version,
                                patterncode: ptcode,
                                mid: music.id,
                            },
                        },
                        create: skill,
                        update: skill,
                    });
                }
            });

            return NextResponse.json({});
        },
    });
};
