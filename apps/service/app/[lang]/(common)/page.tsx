import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import UserInfo from '@/feature/main/userCard/UserInfo';
import { DISCORD, LINK_AUTH_LOGIN } from '@/url/url';
import Link from 'next/link';
import { HowtoWrapper } from '@/feature/main/howto/HowtoWrapper';

/**
 * @abou 메인 페이지
 * @componentType nextjs page
 */
const PageIndex = async () => {
    const session = await getServerSession();
    const t = await getTranslations('main');

    return (
        <article className={'flex-col-center w-full'}>
            {/* 사용자 로그인 정보 & 스크립트 / 공지사항 목록 */}
            <section className={'flex flex-col md:flex-row w-full'}>
                {/* 로그인/사용자 정보 */}
                <Card title={t('user.title')}>
                    {session ? (
                        <UserInfo />
                    ) : (
                        <section className={'flex-col-center'}>
                            <div className={'link'}>
                                <Link href={LINK_AUTH_LOGIN}>
                                    {t('user.beforeLogin.link')}
                                </Link>
                            </div>
                            <div>{t('user.beforeLogin.desc')}</div>
                        </section>
                    )}
                </Card>

                {/* 공지사항 */}
                <Card title={t('discord.title')}>
                    <section className={'flex-col-center h-full gap-[10px]'}>
                        <div>{t('discord.desc')}</div>
                        <Link
                            className={'link'}
                            target={'_blank'}
                            href={DISCORD}
                        >
                            {t('discord.link')}
                        </Link>
                    </section>
                </Card>
            </section>

            <HowtoWrapper />
        </article>
    );
};

export default PageIndex;
