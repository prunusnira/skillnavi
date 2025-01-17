import RouteWrapper from '@/module/api/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import { SkillModel } from '@/data/skill/SkillModel';
import { Skill } from '@/data/skill/Skill';

export const GET = async (
    req: NextRequest,
    { params }: { params: { mid: string } },
) => {
    return await RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const { mid } = params;
            const uid = Number(searchParams.get('uid'));
            const version = Number(searchParams.get('version'));

            const recordInfo = await SkillModel.findAll({
                attributes: {
                    exclude: ['id'],
                },
                where: {
                    uid,
                    mid,
                    playver: version,
                },
            });

            return NextResponse.json(
                recordInfo.map((r) => r.dataValues as Skill),
            );
        },
    });
};
