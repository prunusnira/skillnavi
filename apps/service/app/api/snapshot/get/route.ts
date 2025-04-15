import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import * as fs from 'node:fs';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const id = searchParams.get('id');
            const type = searchParams.get('type');
            const date = searchParams.get('date');

            const filepath = `${process.env.NEXT_PUBLIC_SNAPSHOT}/${id}/${date}_${type}.json`;
            const file = fs.readFileSync(filepath, 'utf8');

            return NextResponse.json(file);
        },
    });
};