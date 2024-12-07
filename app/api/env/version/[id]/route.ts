import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { GameVersionModel } from '@/data/game/GameVersionModel';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    return RouteWrapper({
        req,
        work: async () => {
            const versionInfo = await GameVersionModel.findOne({
                where: {
                    id: params.id,
                },
            });

            return NextResponse.json(versionInfo);
        },
    });
};
