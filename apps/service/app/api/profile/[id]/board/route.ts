import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const GET = async (
    _req: Request,
    { params }: { params: Promise<{ id: string }> },
) => {
    const { id } = await params;
    const boardDirectory = process.env.NEXT_PUBLIC_BOARD;

    if (!/^\d+$/.test(id) || !boardDirectory) {
        return new NextResponse(null, { status: 404 });
    }

    try {
        const image = await readFile(path.join(boardDirectory, `${id}.png`));
        return new NextResponse(new Uint8Array(image), {
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        if (
            error instanceof Error &&
            'code' in error &&
            error.code === 'ENOENT'
        ) {
            return new NextResponse(null, { status: 404 });
        }

        return new NextResponse(null, { status: 500 });
    }
};
