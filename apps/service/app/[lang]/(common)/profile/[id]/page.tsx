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

import { CriticalButton } from '@/feature/profile/component/button/CriticalButton';
import Image from 'next/image';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { getServerSession } from 'next-auth';
import { DetailedInfoTable } from '@/feature/profile/component/detailedinfo/DetailedInfoTable';
import PrefetchQuery from '@/common/wrapper/PrefetchQuery';
import { getProfileDetail } from '@/feature/profile/api/getProfileDetail';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';

const PageProfile = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const t = await getTranslations('profile');
    const { id } = params;
    const mydata = await getProfile([Number(id)]);
    const myskill = await getProfileSkill([Number(id)]);
    const graph = await getProfileGraph(id);
    const session = await getServerSession();
    const user = await getProfileSession(session);
    const latest = await getLatestVersion();

    if (!mydata.length || !myskill) {
        // TODO: 데이터가 없음
        return null;
    }

    // 프로필 정보 가져오기
    const profile = mydata[0];

    if (!profile) {
        return null;
    }

    // 최신작 스킬
    const latestSkill =
        myskill.length > 0
            ? myskill.reduce((prev, current) =>
                  prev.version > current.version ? prev : current,
              )
            : undefined;

    return (
        <article className={cn('flex-col-center w-full')}>
            {/* 프로필 카드 */}
            <Card title={t('info.title')}>
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
                <Card title={t('detail.title')}>
                    <PrefetchQuery
                        queryKey={[
                            'profile',
                            id,
                            'detail',
                            latest,
                        ]}
                        queryFn={() => getProfileDetail(Number(id), latest)}
                    >
                        <DetailedInfoTable initialSkill={latestSkill} />
                    </PrefetchQuery>
                </Card>
            )}

            {/* 플레이어 보드: 사이즈 조정으로 제공, 클릭 시 새 탭으로 열기 */}
            <Card title={t('board')}>
                <Image
                    unoptimized={true}
                    alt="playerboard"
                    src={`${process.env.NEXT_PUBLIC_URL_DATA}/board/${id}.png`}
                    width={320}
                    height={580}
                />
            </Card>

            {/* 로그인 사용자에게만 보이는 영역 */}
            {user?.id === Number(id) && <CriticalButton />}
        </article>
    );
};

export default PageProfile;
