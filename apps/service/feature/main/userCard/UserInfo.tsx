import { cn } from '@/lib/cn';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { getServerSession } from 'next-auth';
import UserButton from '@/feature/main/userCard/UserButton';
import UserBox from '@/feature/profile/component/UserBox';
import { getTranslations } from 'next-intl/server';
import UserScript from '@/feature/main/userCard/UserScript';

const UserInfo = async () => {
    const session = await getServerSession();
    const mydata = await getProfileSession(session);
    const t = await getTranslations('main.user.script');

    if (!mydata) {
        return null;
    }

    return (
        <section className={cn('flex-col-center')}>
            {/* 프로필 정보 */}
            <UserBox mydata={mydata} />
            <UserButton />

            {/* 갱신 스크립트 */}
            <section className={'flex-col-center my-[40px]'}>
                <div className={'text-md font-bold'}>{t('title')}</div>
                <div className={'text-sm'}>{t('desc.desc1')}</div>
                <div className={'text-sm font-bold text-red-400'}>
                    {t('desc.desc2')}
                </div>
                <UserScript unique={mydata.unique_id} />
            </section>
        </section>
    );
};

export default UserInfo;
