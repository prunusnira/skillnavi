import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/module/api/routeWrapper';
import { sequelize } from '@/module/lib/db/dbconn';
import { querySkillTarget } from '@/data/skill/query/querySkillTarget';
import { FetchError } from '@/data/fetch/FetchError';
import { QueryTypes } from 'sequelize';

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
            return NextResponse.json(queryResult);
        },
    });
};
