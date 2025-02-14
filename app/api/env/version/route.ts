import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import prisma from '@/module/lib/db/prisma';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            return NextResponse.json(await prisma.gameVersion.findMany());
        },
    });
};
