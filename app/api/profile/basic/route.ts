import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { FetchError } from '@/data/fetch/FetchError';
import { ProfileModel } from '@/data/profile/ProfileModel';
import { Op } from 'sequelize';

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

            const profile = await ProfileModel.findOne({
                where: {
                    unique_id: {
                        [Op.eq]: token,
                    },
                },
            });

            return NextResponse.json(profile);
        },
    });
};
