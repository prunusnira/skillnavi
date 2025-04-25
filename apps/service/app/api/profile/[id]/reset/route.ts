import RouteWrapper from '@/lib/fetch/routeWrapper';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';

export const POST = async (
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    return RouteWrapper({
        req,
        work: async () => {
            const { id } = params;
            const session = await getServerSession();
            const user = await getProfileSession(session);

            if (!user || user?.id !== Number(id)) {
                return NextResponse.json(
                    { detail: 'invalid' },
                    {
                        status: 400,
                    },
                );
            } else {
                try {
                    await prisma.profileList.update({
                        where: {
                            id: Number(id),
                        },
                        data: {
                            titletower: '',
                            title: '',
                            name: '',
                            comment: '',
                            openinfo: true,
                        },
                    });

                    await prisma.$queryRaw(Prisma.sql`
                        delete
                        from ProfileSkill
                        where uid = ${id}
                    `);

                    await prisma.$queryRaw(Prisma.sql`
                        delete
                        from SkillList
                        where uid = ${id}
                    `);

                    return NextResponse.json({ detail: 'success' });
                } catch (e) {
                    console.error(e);
                    return NextResponse.json(
                        { detail: 'failed' },
                        {
                            status: 500,
                        },
                    );
                }
            }
        },
    });
};
