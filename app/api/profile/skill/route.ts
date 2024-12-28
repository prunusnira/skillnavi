import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { ProfileSkillModel } from '@/data/profile/ProfileSkillModel';
import { Op } from 'sequelize';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const ids = await req.json();

            const result = await ProfileSkillModel.findAll({
                where: {
                    uid: {
                        [Op.or]: ids.id,
                    },
                },
                attributes: {
                    exclude: ['id'],
                },
            });

            console.log(result);

            return NextResponse.json(result);
        },
    });
};
