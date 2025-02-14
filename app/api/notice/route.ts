import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import prisma from '@/module/lib/db/prisma';
import { Notice } from '@/data/notice/Notice';

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
