import { SkillModel } from '@/data/skill/SkillModel';
import { MUSICLIST_SIZE } from '@/data/env/constant';
import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const mid = Number(searchParams.get('mid'));
            const version = Number(searchParams.get('version'));
            const page = Number(searchParams.get('page'));
            const patterncode = Number(searchParams.get('patterncode'));
            const result = await SkillModel.findAll({
                where: {
                    mid,
                    playver: version,
                    patterncode,
                },
                order: [
                    [
                        'rate',
                        'desc',
                    ],
                ],
                offset: (page - 1) * MUSICLIST_SIZE,
                limit: MUSICLIST_SIZE,
                attributes: {
                    exclude: ['id'],
                },
            });
            return NextResponse.json(result);
        },
    });
};
