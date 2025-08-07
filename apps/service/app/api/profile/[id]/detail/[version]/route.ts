import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';

export const GET = async (
    req: NextRequest,
    props: { params: Promise<{ id: string; version: string }> },
) => {
    return RouteWrapper({
        req,
        work: async () => {
            const { id, version } = await props.params;

            const skill = await prisma.profileSkill.findFirst({
                where: {
                    uid: parseInt(id),
                    version: parseInt(version),
                },
            });

            return NextResponse.json(skill);
        },
    });
};
