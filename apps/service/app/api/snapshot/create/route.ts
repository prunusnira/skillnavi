import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import * as fs from 'node:fs';
import { SnapshotData } from '@/feature/snapshot/data/Snapshot';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            try {
                const body = (await req.json()) as SnapshotData;
                const { date, uid, type } = body;

                const directoryPath = `${process.env.NEXT_PUBLIC_SNAPSHOT}${uid}/`;
                fs.mkdirSync(directoryPath, { recursive: true });

                const filePath = `${directoryPath}${date}_${type}.json`;
                fs.writeFileSync(filePath, JSON.stringify(body));
                return NextResponse.json({ detail: 'success' });
            } catch (error) {
                console.error(error);
                return NextResponse.json({ detail: 'error' }, { status: 500 });
            }
        },
    });
};
