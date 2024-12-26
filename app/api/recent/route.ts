import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { ProfileSkillModel } from '@/data/profile/ProfileSkillModel';
import { ProfileModel } from '@/data/profile/ProfileModel';
import { Op } from 'sequelize';
import { Recent } from '@/data/recent/Recent';
import { ProfileSkill } from '@/data/profile/ProfileSkill';
import { Profile } from '@/data/profile/Profile';
import { VER_NX } from '@/data/env/constant';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const recent = await ProfileSkillModel.findAll({
                where: {
                    version: VER_NX,
                },
                attributes: {
                    exclude: ['id'],
                },
                order: [
                    [
                        'lastupdate',
                        'desc',
                    ],
                ],
                limit: 10,
            });

            const uidList = recent.map(
                (user) => (user.dataValues as ProfileSkill).uid,
            );

            const users = await ProfileModel.findAll({
                where: {
                    id: {
                        [Op.or]: uidList,
                    },
                },
            });

            const recentList: Recent[] = [];

            recent.forEach((user) => {
                const me = users.find(
                    (u) =>
                        (u.dataValues as Profile).id ===
                        (user.dataValues as ProfileSkill).uid,
                )?.dataValues as Profile;

                const { titletower, id, name, openinfo } = me;
                const { gskill, dskill, lastupdate } =
                    user.dataValues as ProfileSkill;

                recentList.push({
                    titletower,
                    id,
                    name,
                    gskill,
                    dskill,
                    lastupdate,
                    openinfo,
                });
            });

            return NextResponse.json(recentList);
        },
    });
};
