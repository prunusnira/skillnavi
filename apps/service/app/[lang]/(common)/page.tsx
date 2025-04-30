import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import UserInfo from '@/feature/main/userCard/UserInfo';
import { DISCORD, IMG, LINK_AUTH_LOGIN } from '@/url/url';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

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

            {/* 소개 및 사용방법 */}
            <section className={'flex flex-col md:flex-row w-full'}>
                {/* 카드 1 */}
                <Card title={t('howto.part1.title')}>
                    <section className={'px-2 py-1'}>
                        <div>1. {t('howto.part1.desc.step1')}</div>
                        <div>2. {t('howto.part1.desc.step2')}</div>
                        <div>3. {t('howto.part1.desc.step3')}</div>
                        <img
                            alt={'how to image 1'}
                            src={`${IMG}/howto/howto2-browser.png`}
                        />
                    </section>
                </Card>

                {/* 카드 2 */}
                <Card title={t('howto.part2.title')}>
                    <section className={'px-2 py-1'}>
                        <div>{t('howto.part2.desc.step1')}</div>
                        <div>{t('howto.part2.desc.step2')}</div>
                        <img
                            alt={'how to image 2'}
                            src={`${IMG}/howto/howto3.png`}
                        />
                    </section>
                </Card>
            </section>
        </article>
    );
};

export default PageIndex;
