import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { NoticeModel } from '@/data/notice/NoticeModel';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const params = req.nextUrl.searchParams;
            const page = Number(params.get('page'));
            const size = Number(params.get('size'));

            const notice = await NoticeModel.findAll({
                where: {},
                order: [
                    [
                        'time',
                        'DESC',
                    ],
                ],
                offset: (page - 1) * size,
                limit: size,
            });
            return NextResponse.json(notice);
        },
    });
};
