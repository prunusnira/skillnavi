import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const body = (await req.json()) as { token: string };
            const { token } = body;

            if(token.length > 0) {
                await prisma.profileList.create({
                    data: {
                        unique_id: token,
                    }
                })
            }

            return NextResponse.json({});
        },
    });
};