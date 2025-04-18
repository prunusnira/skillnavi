import { NextRequest, NextResponse } from 'next/server';
import RouteWrapper from '@/lib/fetch/routeWrapper';
import { getUserFromToken } from '@/feature/auth/api/getUserFromToken';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import prisma from '@/lib/db/prisma';
import { UpdateProfile } from '@skillnavi/data/src/profile';
import * as fs from 'node:fs';
import dayjs from 'dayjs';

export const POST = async (req: NextRequest) => {
    return RouteWrapper({
        req,
        work: async () => {
            const body = (await req.json()) as UpdateProfile;

            const latest = await getLatestVersion();

            // 토큰에서 사용자 프로필 번호 확인 가능
            const user = await getUserFromToken(body.crawlToken);

            if (user) {
                // ProfileList 갱신 관련 정보
                // 갱신 대상이 최신 버전일때에만 데이터를 갱신함
                if (body.targetVersion === latest) {
                    const profile = {
                        title: body.title,
                        name: body.name,
                        update_at: new Date(),
                    };

                    await prisma.profileList.update({
                        where: {
                            id: body.userId,
                        },
                        data: profile,
                    });
                }

                // ProfileSkill
                const skill = {
                    gskill: Number(body.gskill || '0') * 100,
                    dskill: Number(body.dskill || '0') * 100,
                    gall: Number(body.gskillall || '0') * 100,
                    dall: Number(body.dskillall || '0') * 100,
                    gclearlv: Number(body.gclearlv || '0'),
                    dclearlv: Number(body.dclearlv || '0'),
                    gclearnum: Number(body.gclearnum || '0'),
                    dclearnum: Number(body.dclearnum || '0'),
                    gfclv: Number(body.gfclv || '0'),
                    dfclv: Number(body.dfclv || '0'),
                    gfcnum: Number(body.gfcnum || '0'),
                    dfcnum: Number(body.dfcnum || '0'),
                    gexclv: Number(body.gexclv || '0'),
                    dexclv: Number(body.dexclv || '0'),
                    gexcnum: Number(body.gexcnum || '0'),
                    dexcnum: Number(body.dexcnum || '0'),
                    lastupdate: new Date(),
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

                // skill record 파일 업데이트
                try {
                    const filePath = `${process.env.NEXT_PUBLIC_RECORD}${String(user.id)}.dat`;

                    // 파일이 없으면 새로 추가
                    let newContent: string[] = [];
                    if(fs.existsSync(filePath)) {
                        const file = fs.readFileSync(filePath, 'utf8');
                        const content = file.split('\n').filter(str => str !== '');
                        newContent = [...content];
                    }

                    const now = dayjs();
                    newContent.push(`${now.format('YYYYMMDD')}_${body.gskill}_${body.dskill}`);

                    if (newContent.length > 1000) {
                        newContent = newContent.slice(newContent.length - 1000, newContent.length - 1);
                    }
                    fs.writeFileSync(filePath, newContent.join('\n'));
                } catch (error) {
                    // error handle, 여기서는 아무것도 안함
                    console.log(error);
                }
            }
            return NextResponse.json({ result: 'success' });
        },
    });
};
