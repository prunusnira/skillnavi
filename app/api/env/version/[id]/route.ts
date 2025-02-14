import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/module/lib/db/prisma';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: number } },
) => {
    return RouteWrapper({
        req,
        work: async () => {
            const version = await prisma.gameVersion.findUnique({
                where: {
                    id: params.id,
                },
            });

            return NextResponse.json(version);
        },
    });
};
