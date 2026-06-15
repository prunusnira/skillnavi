'use client';

import { DISCORD, IMG, LINK_AUTH_LOGIN } from '@/url/url';
import NavItem from '@/feature/header/NavItem';
import useNavbar from '@/feature/header/navbar/useNavbar';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from '@/i18n/routing';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { MainFloatingMenu } from '@/feature/header/navbar/MainFloatingMenu';

const Navbar = () => {
    const { handleLinkMain, controlOption } = useNavbar();
    const t = useTranslations('navbar');
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <nav className={'mx-auto h-full w-full max-w-6xl flex-between'}>
            {/* left side (logo) */}
            <div
                className={'group flex-center gap-2 rounded-xl py-1 pr-2'}
                onClick={handleLinkMain}
            >
                <div
                    className={
                        'h-10 w-10 overflow-hidden rounded-xl ring-1 ring-slate-200 dark:ring-slate-700'
                    }
                >
                    <Image
                        unoptimized={true}
                        alt={'icon'}
                        src={`${IMG}/header/logoidx.png`}
                        width={40}
                        height={40}
                    />
                </div>

                <div className={'hidden md:flex flex-col'}>
                    <div
                        className={
                            'text-xs font-medium text-slate-500 dark:text-slate-400'
                        }
                    >
                        GITADORA Series Skill Simulator
                    </div>
                    <div className={'text-lg font-semibold tracking-tight'}>
                        Skill Navigator
                    </div>
                </div>
            </div>

            {/* right side */}
            <div className={'flex-center pr-10'}>
                {/* 디스코드 링크 */}
                <NavItem>
                    <div
                        className={
                            'flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400'
                        }
                        onClick={() => router.push(DISCORD)}
                    >
                        <FontAwesomeIcon icon={faDiscord} />
                    </div>
                </NavItem>

                {/* 옵션메뉴 */}
                <NavItem>
                    <div
                        className={
                            'flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400'
                        }
                        onClick={controlOption}
                    >
                        <FontAwesomeIcon icon={faGear} />
                    </div>
                </NavItem>

                {/* 사용자 로그인/로그아웃 */}
                <NavItem>
                    <div
                        className={'btn-transparent text-[14px] cursor-pointer'}
                    >
                        {session ? (
                            <div onClick={() => signOut()}>{t('logout')}</div>
                        ) : (
                            <div onClick={() => router.push(LINK_AUTH_LOGIN)}>
                                {t('login')}
                            </div>
                        )}
                    </div>
                </NavItem>

                <NavItem> </NavItem>
            </div>

            {/* 메뉴 버튼 */}
            <MainFloatingMenu />
        </nav>
    );
};

export default Navbar;
