import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string; version: string } },
) {
    const { id, version } = params;

    const skill = await prisma.profileSkill.findFirst({
        where: {
            uid: parseInt(id),
            version: parseInt(version),
        },
    });

    return NextResponse.json(skill);
}
