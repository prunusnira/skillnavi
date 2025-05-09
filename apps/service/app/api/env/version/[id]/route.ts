import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const GET = async (
    req: NextRequest,
    props: { params: Promise<{ id: number }> },
) => {
    const params = await props.params;
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
