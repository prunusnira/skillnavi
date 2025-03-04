import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import prisma from '@/lib/db/prisma';
import { Notice } from '@/feature/notice/data/Notice';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const params = req.nextUrl.searchParams;
            const page = Number(params.get('page'));
            const size = Number(params.get('size'));

            const notice = (await prisma.notice.findMany({
                orderBy: [
                    {
                        time: 'desc',
                    },
                ],
                skip: (page - 1) * size,
                take: size,
            })) as Notice[];
            return NextResponse.json(notice);
        },
    });
};
