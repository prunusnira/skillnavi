import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';

export const POST = async (req: NextRequest, props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    return RouteWrapper({
        req,
        work: async () => {
            const { id } = params;
            const body = (await req.json()) as { opendata: 'true' | 'false' };
            const { opendata } = body;
            await prisma.profileList.update({
                where: {
                    id: Number(id),
                },
                data: {
                    openinfo: opendata === 'true',
                },
            });
            return NextResponse.json({ detail: 'success' });
        },
    });
};
