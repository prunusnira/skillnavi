import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { ProfileModel } from '@/data/profile/ProfileModel';
import { Op } from 'sequelize';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const idList = await req.json();

            const result = await ProfileModel.findAll({
                where: {
                    id: {
                        [Op.or]: idList.id,
                    },
                },
            });

            return NextResponse.json(result);
        },
    });
};
