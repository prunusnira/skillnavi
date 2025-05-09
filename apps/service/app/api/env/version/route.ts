import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            return NextResponse.json(await prisma.gameVersion.findMany());
        },
    });
};
