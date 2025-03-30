import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

export const POST = async (
    req: NextRequest,
    { params }: { params: { uid: string } },
) => {
    return RouteWrapper({
        req,
        work: async () => {
            const { uid } = params;
            const blob = await req.blob();
            const filePath = `/data/board/${uid}.png`;
            const writer = fs.createWriteStream(filePath);
            writer.write(blob);
            writer.close();

            return NextResponse.json({});
        },
    });
};
