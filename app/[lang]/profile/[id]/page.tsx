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

const PageProfile = async ({ params }: { params: { id: string } }) => {
    const t = await getTranslations('user.profile');
    const { id } = params;
    const mydata = await getProfile(id);
    const graph = await getProfileGraph(id);

    if (!mydata) {
        return null;
    }

    const { profile } = mydata;

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
                <SkillBox profile={profile} />
            </Card>

            {/* 스킬 그래프 */}
            <Card title={t('graph')}>
                <GraphBox data={graph} />
            </Card>

            {/* 상세 정보 테이블 */}
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
                        <div className={style.detailCell}>{profile.gskill}</div>
                        <div className={style.detailCell}>{profile.dskill}</div>
                    </div>
                    <div className={style.detailRow}>
                        <div className={style.detailCell}>
                            {t('detailed.clv')}
                        </div>
                        <div className={style.detailCell}>
                            {profile.gclearlv} ({profile.gclearnum})
                        </div>
                        <div className={style.detailCell}>
                            {profile.dclearlv} ({profile.dclearnum})
                        </div>
                    </div>
                    <div className={style.detailRow}>
                        <div className={style.detailCell}>
                            {t('detailed.flv')}
                        </div>
                        <div className={style.detailCell}>
                            {profile.gfclv} ({profile.gfcnum})
                        </div>
                        <div className={style.detailCell}>
                            {profile.dfclv} ({profile.dfcnum})
                        </div>
                    </div>
                    <div className={style.detailRow}>
                        <div className={style.detailCell}>
                            {t('detailed.elv')}
                        </div>
                        <div className={style.detailCell}>
                            {profile.gexclv} ({profile.gexcnum})
                        </div>
                        <div className={style.detailCell}>
                            {profile.dexclv} ({profile.dexcnum})
                        </div>
                    </div>
                    <div className={style.detailRow}>
                        <div className={style.detailCell}>
                            {t('detailed.count')}
                        </div>
                        <div className={style.detailCell}>
                            {profile.countgf}
                        </div>
                        <div className={style.detailCell}>
                            {profile.countdm}
                        </div>
                    </div>
                </section>
            </Card>

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
