import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import * as fs from 'node:fs';

export const GET = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const searchParams = req.nextUrl.searchParams;
            const id = searchParams.get('id');

            const dirpath = `${process.env.NEXT_PUBLIC_SNAPSHOT}${id}/`;
            const dir = fs.readdirSync(dirpath, {
                withFileTypes: true,
            });

            // key: date, value: filename
            const gfMap: Map<string, string> = new Map();
            const dmMap: Map<string, string> = new Map();

            dir.forEach(file => {
                const { name } = file;
                const splited = name.split('.')[0]?.split('_');
                if (splited && splited.length === 2) {
                    const [date, type] = splited;
                    if (date) {
                        if (type === 'gf') {
                            gfMap.set(date, name);
                        }
                        if (type === 'dm') {
                            dmMap.set(date, name);
                        }
                    }
                }
            });

            return NextResponse.json({
                gf: Array.from(gfMap),
                dm: Array.from(dmMap),
            });
        },
    });
};