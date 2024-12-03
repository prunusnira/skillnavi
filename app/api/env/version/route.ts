import { GameVersionModel } from '@/data/game/GameVersionModel';
import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            return NextResponse.json(await GameVersionModel.findAll());
        },
    });
};
