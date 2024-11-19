import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { RecentModel } from '@/data/recent/RecentModel';
import { Op } from 'sequelize';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const recent = await RecentModel.findAll({
                where: {
                    gskill: {
                        [Op.not]: 0,
                    },
                    dskill: {
                        [Op.not]: 0,
                    },
                },
                order: [
                    [
                        'updatetime',
                        'desc',
                    ],
                ],
                limit: 10,
            });
            return NextResponse.json({ recent });
        },
    });
};
