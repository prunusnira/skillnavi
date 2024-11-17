import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { ProfileOldModel } from '@/data/profile/ProfileOldModel';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    return RouteWrapper({
        req,
        work: async () => {
            const { id } = params;
            const profile = await ProfileOldModel.findOne({
                where: {
                    id,
                },
            });
            return NextResponse.json({ profile });
        },
    });
};
