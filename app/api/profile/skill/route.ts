import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/module/lib/db/prisma';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const ids = (await req.json()) as { id: number[] };

            const result = await prisma.profileSkill.findMany({
                where: {
                    OR: ids.id.map((user) => ({ uid: user })),
                },
            });

            return NextResponse.json(result);
        },
    });
};
