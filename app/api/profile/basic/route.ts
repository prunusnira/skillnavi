import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { ProfileBasicModel } from '@/data/profile/ProfileBasicModel';
import { Op } from 'sequelize';
import { FetchError } from '@/data/fetch/FetchError';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const token = searchParams.get('token');

            if (!token) {
                throw new FetchError({
                    status: 500,
                    response: { message: 'token does not exist' },
                });
            }

            const profile = await ProfileBasicModel.findOne({
                where: {
                    token: {
                        [Op.eq]: token,
                    },
                },
            });

            return NextResponse.json(profile);
        },
    });
};
