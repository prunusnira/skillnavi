import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { sequelize } from '@/module/lib/db/dbconn';
import { querySkillTarget } from '@/data/skill/query/querySkillTarget';
import { FetchError } from '@/data/fetch/FetchError';
import { QueryTypes } from 'sequelize';
import { querySkillAllPage } from '@/data/skill/query/querySkillAllPage';
import { OrderType } from '@/data/skill/OrderType';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;

            const pageType = searchParams.get('pageType');
            const userid = Number(searchParams.get('userid'));
            const version = Number(searchParams.get('version'));
            const game = searchParams.get('game') || '';
            const isHot = searchParams.get('isHot') === 'true';
            const isOthers = searchParams.get('isOthers') === 'true';
            const page = Number(searchParams.get('page'));
            const order = searchParams.get('order') || 'skilldesc';

            if (!pageType) {
                throw new FetchError({
                    status: 500,
                    response: 'No Page Type Provided',
                });
            }

            let queryResult = null;
            if (pageType === 'target') {
                queryResult = await sequelize.query(
                    querySkillTarget({
                        userid,
                        version,
                        game,
                        isHot,
                        isOthers,
                    }),
                    {
                        type: QueryTypes.SELECT,
                    },
                );
            }
            if (pageType === 'all') {
                queryResult = await sequelize.query(
                    querySkillAllPage({
                        userid,
                        version,
                        game,
                        isHot,
                        isOthers,
                        page,
                        order: order as OrderType,
                    }),
                    {
                        type: QueryTypes.SELECT,
                    },
                );
            }
            return NextResponse.json(queryResult);
        },
    });
};
