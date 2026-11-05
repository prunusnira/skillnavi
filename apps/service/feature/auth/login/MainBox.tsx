import UserInfo from '@/feature/main/userCard/UserInfo';
import Link from 'next/link';
import { LINK_AUTH_LOGIN } from '@/url/url';
import { getTranslations } from 'next-intl/server';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';

export const MainBox = async () => {
    const t = await getTranslations('user.beforeLogin');
    const profile = await getProfileSession();

    if (profile) {
        return <UserInfo profile={profile} />;
    }

    return (
        <section className={'flex-col-center'}>
            <div className={'link'}>
                <Link href={LINK_AUTH_LOGIN}>{t('link')}</Link>
            </div>
            <div>{t('desc')}</div>
        </section>
    );
};
