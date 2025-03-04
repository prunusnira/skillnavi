import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { fetchFile } from '@/lib/fetch/fetchAdv';
import { ProfileGraphRaw } from '@/feature/profile/data/ProfileGraph';

export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    return RouteWrapper({
        req,
        work: async () => {
            const { id } = params;
            const fileUrl = `${process.env.NEXT_PUBLIC_URL_DATA}${process.env.NEXT_PUBLIC_DIR_GRAPH}/${id}.dat`;
            const file = await fetchFile(fileUrl);
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
                        date,
                        gf: Number(gf),
                        dm: Number(dm),
                    });
                }
            });
            return NextResponse.json(dataArray);
        },
    });
};
