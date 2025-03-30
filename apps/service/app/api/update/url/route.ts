import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import { UpdateUrl } from '@/feature/update/data/UpdateUrl';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const urls = (await prisma.updateUrl.findMany()) as UpdateUrl[];
            return NextResponse.json(urls);
        },
    });
};
