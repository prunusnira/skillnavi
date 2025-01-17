import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { sequelize } from '@/module/lib/db/dbconn';
import { FetchError } from '@/data/fetch/FetchError';
import { Op } from 'sequelize';
import { SkillTableData } from '@/data/skill/SkillTableData';
import { SkillData } from '@/data/skill/Skill';
import { MusicModel } from '@/data/music/MusicModel';
import { PatternModel } from '@/data/pattern/PatternModel';
import { SkillModel } from '@/data/skill/SkillModel';
import { Pattern } from '@/data/pattern/Pattern';
import { SKILL_SIZE } from '@/data/env/constant';

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
            const order = searchParams.get('order') || 'skilldesc';

            if (!pageType) {
                throw new FetchError({
                    status: 500,
                    response: 'No Page Type Provided',
                });
            }

            const tableItems: SkillData[][] = [];
            let pages = 0;

            // 버전 전체 테이블 가져오기
            if (pageType === 'all') {
                const skill = await SkillModel.findAll({
                    where: {
                        uid: userid,
                        playver: version,
                        patterncode:
                            game === 'gf'
                                ? {
                                      [Op.lt]: 9,
                                  }
                                : {
                                      [Op.gt]: 8,
                                  },
                    },
                    order: [
                        [
                            sequelize.literal(`(level*rate)`),
                            'desc',
                        ],
                    ],
                    attributes: {
                        exclude: ['id'],
                    },
                    limit: SKILL_SIZE,
                    offset: (page - 1) * SKILL_SIZE,
                });

                pages = await SkillModel.count({
                    where: {
                        uid: userid,
                        playver: version,
                        patterncode:
                            game === 'gf'
                                ? {
                                      [Op.lt]: 9,
                                  }
                                : {
                                      [Op.gt]: 8,
                                  },
                    },
                });

                const data: SkillData[] = skill.map((s) => s.dataValues);
                tableItems.push(data);
            }

            // 스킬대상곡 가져오기
            if (pageType === 'target') {
                const hot = await SkillModel.findAll({
                    where: {
                        uid: userid,
                        playver: version,
                        hot: 1,
                        patterncode:
                            game === 'gf'
                                ? {
                                      [Op.lt]: 9,
                                  }
                                : {
                                      [Op.gt]: 8,
                                  },
                    },
                    order: [
                        [
                            sequelize.literal(`(level*rate)`),
                            'desc',
                        ],
                    ],
                    limit: 25,
                    attributes: {
                        exclude: ['id'],
                    },
                });

                const other = await SkillModel.findAll({
                    where: {
                        uid: userid,
                        playver: version,
                        hot: 0,
                        patterncode:
                            game === 'gf'
                                ? {
                                      [Op.lt]: 9,
                                  }
                                : {
                                      [Op.gt]: 8,
                                  },
                    },
                    order: [
                        [
                            sequelize.literal(`(level*rate)`),
                            'desc',
                        ],
                    ],
                    limit: 25,
                    attributes: {
                        exclude: ['id'],
                    },
                });

                tableItems.push(hot.map((s) => s.dataValues));
                tableItems.push(other.map((s) => s.dataValues));
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

            const musiclist = await MusicModel.findAll({
                where: {
                    id: midList,
                },
            });

            const patternInfo: Promise<Pattern | null>[] = [];

            tableItems.map(async (skillSet) =>
                skillSet.map(async (skill) =>
                    patternInfo.push(
                        PatternModel.findOne({
                            where: {
                                mid: skill.mid,
                                patterncode: skill.patterncode,
                                version: skill.playver,
                            },
                            attributes: {
                                exclude: ['id'],
                            },
                        }),
                    ),
                ),
            );

            const patternlist = await Promise.all(patternInfo);

            const result: SkillTableData[][] = [];
            tableItems.forEach((skillSet) => {
                const list: SkillTableData[] = [];
                skillSet.forEach((s) => {
                    const music = musiclist.find(
                        (m) => m.id === s.mid,
                    )?.dataValues;
                    const pattern = patternlist.find(
                        (p) =>
                            p &&
                            p.mid === s.mid &&
                            p.patterncode === s.patterncode,
                    )?.dataValues;

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
