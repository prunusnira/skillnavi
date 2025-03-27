import { cn } from '@/lib/cn';
import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import UserBox from '@/feature/profile/component/UserBox';
import { getProfile } from '@/feature/profile/api/getProfile';
import { getProfileGraph } from '@/feature/profile/api/getProfileGraph';
import GraphBox from '@/feature/profile/component/graphbox/GraphBox';
import SkillBox from '@/feature/profile/component/skillbox/SkillBox';
import ProfileButton from '@/feature/profile/component/button/ProfileButton';
import { getProfileSkill } from '@/feature/profile/api/getProfileSkill';
import { getGameVersions } from '@/feature/env/api/getGameVersions';
import Image from 'next/image';
import style from './page.module.scss';

export const dynamic = 'force-dynamic';

const PageProfile = async ({ params }: { params: { id: string } }) => {
    const t = await getTranslations('user.profile');
    const { id } = params;
    const mydata = await getProfile([Number(id)]);
    const myskill = await getProfileSkill([Number(id)]);
    const graph = await getProfileGraph(id);
    const game = await getGameVersions();

    if (!mydata.length || !myskill) {
        // TODO: 데이터가 없음
        return null;
    }

    // 프로필 정보 가져오기
    const profile = mydata[0];

    // 버전정보 가져오기
    const codeSorted = game.map((data) => data.id).sort((a, b) => b - a);

    // 최신작 스킬
    const latestSkill = myskill.find(
        (skill) => skill.version === codeSorted[0],
    );

    return (
        <article className={cn('flex-col-center w-full')}>
            {/* 프로필 카드 */}
            <Card title={t('profile')}>
                {/* 기본 프로필 영역 */}
                <UserBox mydata={profile} />

                {/* 코멘트 */}
                <div>{profile.comment}</div>

                {/* 버튼 */}
                <ProfileButton />

                {/* 스킬 기록 */}
                <SkillBox skill={myskill} />
            </Card>

            {/* 스킬 그래프 */}
            <Card title={t('graph')}>
                <GraphBox data={graph} />
            </Card>

            {/* 상세 정보 테이블 */}
            {latestSkill && (
                <Card title={t('detail')}>
                    <section className={cn('flex-col-center w-full')}>
                        <div className={style.detailRow}>
                            <div className={style.detailCell}>#</div>
                            <div className={style.detailCell}>GuitarFreaks</div>
                            <div className={style.detailCell}>DrumMania</div>
                        </div>
                        <div className={style.detailRow}>
                            <div className={style.detailCell}>
                                {t('detailed.s')}
                            </div>
                            <div className={style.detailCell}>
                                {latestSkill.gskill}
                            </div>
                            <div className={style.detailCell}>
                                {latestSkill.dskill}
                            </div>
                        </div>
                        <div className={style.detailRow}>
                            <div className={style.detailCell}>
                                {t('detailed.clv')}
                            </div>
                            <div className={style.detailCell}>
                                {latestSkill.gclearlv} ({latestSkill.gclearnum})
                            </div>
                            <div className={style.detailCell}>
                                {latestSkill.dclearlv} ({latestSkill.dclearnum})
                            </div>
                        </div>
                        <div className={style.detailRow}>
                            <div className={style.detailCell}>
                                {t('detailed.flv')}
                            </div>
                            <div className={style.detailCell}>
                                {latestSkill.gfclv} ({latestSkill.gfcnum})
                            </div>
                            <div className={style.detailCell}>
                                {latestSkill.dfclv} ({latestSkill.dfcnum})
                            </div>
                        </div>
                        <div className={style.detailRow}>
                            <div className={style.detailCell}>
                                {t('detailed.elv')}
                            </div>
                            <div className={style.detailCell}>
                                {latestSkill.gexclv} ({latestSkill.gexcnum})
                            </div>
                            <div className={style.detailCell}>
                                {latestSkill.dexclv} ({latestSkill.dexcnum})
                            </div>
                        </div>
                        <div className={style.detailRow}>
                            <div className={style.detailCell}>
                                {t('detailed.count')}
                            </div>
                            <div className={style.detailCell}>
                                {latestSkill.gcount}
                            </div>
                            <div className={style.detailCell}>
                                {latestSkill.dcount}
                            </div>
                        </div>
                    </section>
                </Card>
            )}

            {/* 플레이어 보드: 사이즈 조정으로 제공, 클릭 시 새 탭으로 열기 */}
            <Card title={t('board.title')}>
                <Image
                    unoptimized={true}
                    alt="playerboard"
                    src={`${process.env.NEXT_PUBLIC_URL_DATA}/board/${id}.png`}
                    width={320}
                    height={580}
                />
            </Card>
        </article>
    );
};

export default PageProfile;
