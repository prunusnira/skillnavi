import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import { TowerList } from '@/feature/tower/data/Tower';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const towerList = (await prisma.towerList.findMany()) as TowerList[];
            return NextResponse.json(towerList);
        }
    })
}