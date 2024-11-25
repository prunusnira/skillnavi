import RouteWrapper from '@/module/api/routeWrapper';
import { GameVersionModel } from '@/data/game/GameVersionModel';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const result = await GameVersionModel.findOne({
                limit: 1,
                order: [
                    [
                        'id',
                        'desc',
                    ],
                ],
            });
            return NextResponse.json(result);
        },
    });
};
