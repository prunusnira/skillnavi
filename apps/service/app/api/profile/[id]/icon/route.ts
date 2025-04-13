import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';

export const POST = async (req: NextRequest, { params }: { params: { id: number } }) => {
    return RouteWrapper({
        req,
        work: async () => {
            const body = (await req.json()) as { icon: string };
            const { icon } = body;
            const { id } = params;
            await prisma.profileList.update({
                where: {
                    id: Number(id),
                },
                data: {
                    titletower: icon,
                },
            });
            return NextResponse.json({ detail: 'success' });
        },
    });
};