import { cn } from '@/module/util/cn';
import Card from '@/component/common/card/Card';
import { getTranslations } from 'next-intl/server';
import UserBox from '@/component/profile/UserBox';
import { getProfile } from '@/module/api/profile/getProfile';
import { getProfileGraph } from '@/module/api/profile/getProfileGraph';
import GraphBox from '@/component/profile/graphbox/GraphBox';
import SkillBox from '@/component/profile/skillbox/SkillBox';
import style from './page.module.scss';
import ButtonRounded from '@/component/common/button/ButtonRounded';
import ProfileButton from '@/component/profile/button/ProfileButton';
import { getProfileSkill } from '@/module/api/profile/getProfileSkill';
import { getGameVersions } from '@/module/api/env/getGameVersions';

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
                <div className={cn('flex-center gap-2')}>
                    <ButtonRounded text={t('button.mybest')} />
                    <ButtonRounded text={t('button.clearRankTable')} />
                    <ProfileButton />
                </div>

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
                <img
                    alt="playerboard"
                    src={`${process.env.NEXT_PUBLIC_URL_DATA}/board/${id}.png`}
                />
            </Card>
        </article>
    );
};

export default PageProfile;
