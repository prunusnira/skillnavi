import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { ProfileGraphRaw } from '@/feature/profile/data/ProfileGraph';
import * as fs from 'node:fs';

export const GET = async (
    req: NextRequest,
    props: { params: Promise<{ id: string }> },
) => {
    const params = await props.params;
    return RouteWrapper({
        req,
        work: async () => {
            const { id } = params;
            const fileUrl = `${process.env.NEXT_PUBLIC_RECORD}/${id}.dat`;
            if (!fs.existsSync(fileUrl)) {
                return NextResponse.json([] as ProfileGraphRaw[]);
            }

            const file = fs.readFileSync(fileUrl, 'utf8');
            const textArray = file.split('\n');
            const dataArray: ProfileGraphRaw[] = [];
            textArray.forEach((line) => {
                const converted = line.split('_');
                if (converted.length === 3) {
                    const [
                        date,
                        gf,
                        dm,
                    ] = converted;
                    dataArray.push({
                        date: String(date),
                        gf: Number(gf),
                        dm: Number(dm),
                    });
                }
            });
            return NextResponse.json(dataArray);
        },
    });
};
