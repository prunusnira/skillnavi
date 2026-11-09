import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { VER_TB } from '@/feature/env/data/constant';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const versions = await prisma.gameVersion.findMany({
                where: {
                    id: {
                        gte: VER_TB,
                    },
                },
                orderBy: {
                    id: 'asc',
                },
            });

            return NextResponse.json(versions);
        },
    });
};
