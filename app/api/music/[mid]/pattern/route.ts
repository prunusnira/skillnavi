import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { PatternModel } from '@/data/pattern/PatternModel';
import { Pattern } from '@/data/pattern/Pattern';

export const GET = async (
    req: NextRequest,
    { params }: { params: { mid: number } },
) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const { mid } = params;
            const version = Number(searchParams.get('version'));

            const patternList = await PatternModel.findAll({
                attributes: {
                    exclude: ['id'],
                },
                where: {
                    mid,
                    version,
                },
            });

            const pattern = patternList.map((p) => p.dataValues as Pattern);

            return NextResponse.json(pattern);
        },
    });
};
