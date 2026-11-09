'use client';

import { DISCORD, LINK_AUTH_LOGIN, LINK_MAIN } from '@/url/url';
import useNavbar from '@/feature/header/navbar/useNavbar';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from '@/i18n/routing';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { MainFloatingMenu } from '@/feature/header/navbar/MainFloatingMenu';
import { useSession } from '@/feature/auth/hook/useSession';
import { logout } from '@/feature/auth/api/logout';
import { useQueryClient } from '@tanstack/react-query';

const Navbar = () => {
    const { handleLinkMain, controlOption } = useNavbar();
    const t = useTranslations('navbar');
    const router = useRouter();
    const session = useSession();
    const queryClient = useQueryClient();

    const handleLogout = async () => {
        await logout();
        queryClient.setQueryData(['session'], {
            authenticated: false,
            profile: null,
        });
        router.push(LINK_MAIN);
        router.refresh();
    };

    return (
        <nav className={'mx-auto h-full w-full max-w-6xl flex-between'}>
            {/* left side (logo) */}
            <button
                type="button"
                aria-label="Skill Navigator home"
                className={
                    'group flex items-center gap-2 rounded-2xl py-1 pr-2 text-left transition-opacity hover:opacity-80'
                }
                onClick={handleLinkMain}
            >
                <div
                    className={
                        'h-10 w-10 overflow-hidden rounded-[14px] ring-1 ring-lime-300/50 shadow-[0_0_20px_rgba(200,245,66,0.16)]'
                    }
                >
                    <Image
                        unoptimized={true}
                        alt={''}
                        src={'/skill-navigator-mark.svg'}
                        width={40}
                        height={40}
                    />
                </div>

                <div className={'navbar-brand-copy flex-col'}>
                    <div
                        className={
                            'text-[10px] font-semibold uppercase tracking-[0.1em] text-lime-200/80'
                        }
                    >
                        GITADORA Series Skill Simulator
                    </div>
                    <div
                        className={
                            'text-lg font-bold tracking-tight text-white'
                        }
                    >
                        Skill Navigator
                    </div>
                </div>
            </button>

            {/* right side */}
            <div className={'flex items-center gap-1 pr-12 sm:gap-2'}>
                {/* 디스코드 링크 */}
                <button
                    type="button"
                    aria-label="Discord"
                    className={'nav-action'}
                    onClick={() => router.push(DISCORD)}
                >
                    <FontAwesomeIcon icon={faDiscord} />
                </button>

                {/* 옵션메뉴 */}
                <button
                    type="button"
                    aria-label={t('settings')}
                    data-settings-trigger
                    className={'nav-action'}
                    onClick={controlOption}
                >
                    <FontAwesomeIcon icon={faGear} />
                </button>

                {/* 사용자 로그인/로그아웃 */}
                {session?.authenticated ? (
                    <button
                        type="button"
                        className={
                            'ml-1 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-lime-300/40 hover:bg-white/10 hover:text-white'
                        }
                        onClick={() => void handleLogout()}
                    >
                        {t('logout')}
                    </button>
                ) : (
                    <button
                        type="button"
                        className={
                            'ml-1 rounded-xl bg-lime-300 px-3.5 py-2 text-sm font-extrabold text-slate-950 shadow-md shadow-lime-300/15 transition-all hover:-translate-y-0.5 hover:bg-lime-200'
                        }
                        onClick={() => router.push(LINK_AUTH_LOGIN)}
                    >
                        {t('login')}
                    </button>
                )}
            </div>

            {/* 메뉴 버튼 */}
            <MainFloatingMenu />
        </nav>
    );
};

export default Navbar;
