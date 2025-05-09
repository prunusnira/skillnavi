import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';

export const POST = async (req: NextRequest, props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    return RouteWrapper({
        req,
        work: async () => {
            const body = (await req.json()) as { comment: string };
            const { comment } = body;
            const { id } = params;

            await prisma.profileList.update({
                where: {
                    id: Number(id),
                },
                data: {
                    comment,
                },
            });
            return NextResponse.json({ detail: 'success' });
        },
    });
};
