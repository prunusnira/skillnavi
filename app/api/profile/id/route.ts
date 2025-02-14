import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import prisma from '@/module/lib/db/prisma';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const idList = (await req.json()) as { id: number[] };

            const result = await prisma.profileList.findMany({
                where: {
                    OR: idList.id.map((user) => ({ id: user })),
                },
            });

            return NextResponse.json(result);
        },
    });
};
