import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { UpdateProfileInfo } from '@/common/update/UpdateProfileInfo';
import { getUserFromToken } from '@/feature/auth/api/getUserFromToken';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import prisma from '@/lib/db/prisma';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const body = (await req.json()) as UpdateProfileInfo;

            const latest = await getLatestVersion();

            // 토큰에서 사용자 프로필 번호 확인 가능
            const user = await getUserFromToken(body.userToken);

            if (user) {
                // ProfileList 갱신 관련 정보
                // 갱신 대상이 최신 버전일때에만 데이터를 갱신함
                if (body.targetVersion === latest) {
                    const profile = {
                        title: body.title,
                        name: body.name,
                    };

                    await prisma.profileList.update({
                        where: {
                            id: body.userId,
                            update_at: new Date(),
                        },
                        data: profile,
                    });
                }

                // ProfileSkill
                const skill = {
                    gskill: body.gskill,
                    dskill: body.dskill,
                    gskillall: body.gskillall,
                    dskillall: body.dskillall,
                    gclearlv: body.gclearlv,
                    dclearlv: body.dclearlv,
                    gclearnum: body.gclearnum,
                    dclearnum: body.dclearnum,
                    gfclv: body.gfclv,
                    dfclv: body.dfclv,
                    gfcnum: body.gfcnum,
                    dfcnum: body.dfcnum,
                    gexclv: body.gexclv,
                    dexclv: body.dexclv,
                    gexcnum: body.gexcnum,
                    dexcnum: body.dexcnum,
                };

                await prisma.profileSkill.upsert({
                    where: {
                        version_uid: {
                            uid: body.userId,
                            version: body.targetVersion ?? latest,
                        },
                    },
                    update: skill,
                    create: {
                        ...skill,
                        uid: body.userId,
                        version: body.targetVersion ?? latest,
                    },
                });
            }
            return NextResponse.json({ result: 'success' });
        },
    });
};
