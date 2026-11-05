import { cn } from '@/lib/cn';
import UserButton from '@/feature/main/userCard/UserButton';
import UserBox from '@/feature/profile/component/UserBox';
import { getTranslations } from 'next-intl/server';
import UserScript from '@/feature/main/userCard/UserScript';
import type { Profile } from '@/feature/profile/data/Profile';

interface Props {
    profile: Profile;
}

const UserInfo = async ({ profile }: Props) => {
    const t = await getTranslations('main.user.script');

    return (
        <section className={cn('flex-col-center')}>
            {/* 프로필 정보 */}
            <UserBox mydata={profile} />
            <UserButton />

            {/* 갱신 스크립트 */}
            <section className={'flex-col-center my-[40px]'}>
                <div className={'text-md font-bold'}>{t('title')}</div>
                <div className={'text-sm'}>{t('desc.desc1')}</div>
                <div className={'text-sm font-bold text-red-400'}>
                    {t('desc.desc2')}
                </div>
                <UserScript unique={profile.unique_id} />
            </section>
        </section>
    );
};

export default UserInfo;
