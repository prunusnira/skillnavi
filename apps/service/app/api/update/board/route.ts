import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';

export const POST = async (
    req: NextRequest,
) => {
    return RouteWrapper({
        req,
        work: async () => {
            let fd;
            try {
                const searchParams = req.nextUrl.searchParams;
                const uid = searchParams.get('uid');
                const blob = await req.text();
                const filePath = `${process.env.NEXT_PUBLIC_BOARD}${uid}.png`;
                const buffer = Buffer.from(blob, 'base64');
                const fd = fs.openSync(filePath, 'w');
                fs.writeFileSync(fd, buffer);
                fs.close(fd);
            } catch (error) {
                console.log(error);
            } finally {
                if(fd) fs.close(fd);
            }

            return NextResponse.json({});
        },
    });
};
