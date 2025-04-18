import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { LogParams } from '@skillnavi/data/src/log/Log.data';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const body = (await req.json()) as LogParams;
            const { uid, action, data } = body;

            await prisma.log.create({
                data: {
                    logid: nanoid(),
                    uid,
                    action,
                    data,
                    date: dayjs().toDate(),
                },
            });

            return NextResponse.json({ detail: 'success' });
        },
    });
};