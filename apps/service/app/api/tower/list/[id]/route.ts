import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import { TowerList } from '@/feature/tower/data/Tower';

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    return RouteWrapper({
        req,
        work: async () => {
            const { id } = params;
            const towerList = (await prisma.towerList.findFirst({
                where: {
                    id: Number(id),
                },
            })) as TowerList;
            return NextResponse.json(towerList);
        },
    });
};