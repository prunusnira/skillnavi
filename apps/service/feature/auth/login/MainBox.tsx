import UserInfo from '@/feature/main/userCard/UserInfo';
import Link from 'next/link';
import { LINK_AUTH_LOGIN } from '@/url/url';
import { useTranslations } from 'next-intl';

export const MainBox = () => {
    const t = useTranslations('user.beforeLogin');

    const session = false;

    if (session) {
        <UserInfo />
    }

    return (
        <section className={'flex-col-center'}>
            <div className={'link'}>
                <Link href={LINK_AUTH_LOGIN}>
                    {t('link')}
                </Link>
            </div>
            <div>{t('desc')}</div>
        </section>
    )
}