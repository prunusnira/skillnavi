import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { ProfileModel } from '@/data/profile/ProfileModel';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const params = req.nextUrl.searchParams;
            const token = params.get('token');

            const profile = await ProfileModel.findOne({
                where: { unique_id: token || '' },
            });

            return NextResponse.json(profile);
        },
    });
};
