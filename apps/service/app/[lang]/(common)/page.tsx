import { cn } from '@/lib/cn';
import Card from '@/common/card/Card';
import { getLocale, getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import UserInfo from '@/feature/main/userCard/UserInfo';
import { getNotice } from '@/feature/notice/api/getNotice';
import { IMG, LINK_AUTH_LOGIN } from '@/url/url';
import { getNoticeByLocale } from '@/lib/notice/getNoticeByLocale';
import dayjs from 'dayjs';
import style from './page.module.scss';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

/**
 * @abou 메인 페이지
 * @componentType nextjs page
 */
const PageIndex = async () => {
    const session = await getServerSession();
    const t = await getTranslations('main');
    const locale = await getLocale();

    const notice = await getNotice({ page: 1, size: 4 });
    const noticeDisplay = getNoticeByLocale(locale, notice);

    return (
        <article className={cn('flex-col-center w-full')}>
            {/* 사용자 로그인 정보 & 스크립트 / 공지사항 목록 */}
            <section className={cn('flex flex-col md:flex-row w-full')}>
                {/* 로그인/사용자 정보 */}
                <Card title={t('user.title')}>
                    {session ? (
                        <UserInfo />
                    ) : (
                        <section className={'flex-col-center'}>
                            <div className={cn('link')}>
                                <Link href={LINK_AUTH_LOGIN}>
                                    {t('user.beforeLogin.link')}
                                </Link>
                            </div>
                            <div>{t('user.beforeLogin.desc')}</div>
                        </section>
                    )}
                </Card>

                {/* 공지사항 */}
                <Card title={t('notice.title')}>
                    {noticeDisplay.length ? (
                        <section className={cn(style.noticeCard)}>
                            <section
                                className={cn(
                                    style.noticeItem,
                                    'bg-white font-bold',
                                )}
                            >
                                <div
                                    className={cn(
                                        style.noticeId,
                                        'justify-center text-black',
                                    )}
                                >
                                    {t('notice.table.no')}
                                </div>
                                <div
                                    className={cn(
                                        style.noticeTitle,
                                        'justify-center text-black',
                                    )}
                                >
                                    {t('notice.table.title')}
                                </div>
                                <div
                                    className={cn(
                                        style.noticeTime,
                                        'justify-center text-black',
                                    )}
                                >
                                    {t('notice.table.date')}
                                </div>
                            </section>
                            {noticeDisplay.map((n) => (
                                <section
                                    key={n.id}
                                    className={cn(style.noticeItem)}
                                >
                                    <div className={style.noticeId}>{n.id}</div>
                                    <div className={style.noticeTitle}>
                                        {n.title}
                                    </div>
                                    <div className={style.noticeTime}>
                                        {dayjs(n.time).format('YYYY-MM-DD')}
                                    </div>
                                </section>
                            ))}
                        </section>
                    ) : (
                        <div>{t('notice.empty')}</div>
                    )}
                </Card>
            </section>

            {/* 소개 및 사용방법 */}
            <section className={cn('flex flex-col md:flex-row w-full')}>
                {/* 카드 1 */}
                <Card title={t('howto.part1.title')}>
                    <section className={cn('px-2 py-1')}>
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
                    <section className={cn('px-2 py-1')}>
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
