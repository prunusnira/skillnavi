import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import { TowerFloorIcon } from '@/feature/tower/data/Tower';

export const GET = async (req: NextRequest, props: { params: Promise<{ id: number }> }) => {
    const params = await props.params;
    return RouteWrapper({
        req,
        work: async () => {
            const { id } = params;

            const list = (await prisma.towerFloorIcon.findMany({
                where: {
                    tid: Number(id),
                }
            })) as TowerFloorIcon[];

            return NextResponse.json(list);
        },
    });
};