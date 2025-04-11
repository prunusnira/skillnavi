import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import { TowerItem } from '@/feature/tower/data/Tower';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const id = searchParams.get('id');

            if (!id) {
                return NextResponse.json([]);
            }

            const list = (await prisma.towerItems.findMany({
                where: {
                    tid: Number(id),
                },
            })) as TowerItem[];

            return NextResponse.json(list);
        },
    });
};