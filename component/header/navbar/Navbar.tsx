'use client';

import { cn } from '@/module/util/cn';
import { IMG, LINK } from '@/data/url';
import NavItem from '@/component/header/navItem';
import Toggle from '@/component/common/toggle/toggle';
import useNavbar from '@/component/header/navbar/useNavbar';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from '@/i18n/routing';

const Navbar = () => {
    const { isMenuOpen, theme, setTheme, handleLinkMain, controlMenu } =
        useNavbar();
    const t = useTranslations('header');
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <nav
            className={cn([
                'w-full h-full flex-between',
            ])}
        >
            {/* left side (logo) */}
            <div
                className={cn(['w-[40px] h-[40px] cursor-pointer'])}
                onClick={handleLinkMain}
            >
                <img
                    className={cn(['w-full h-full'])}
                    alt={'icon'}
                    src={`${IMG}/header/logoidx.png`}
                />
            </div>

            {/* right side */}
            <div className={cn('flex-center')}>
                {/* 테마 변경 토글 */}
                <NavItem>
                    <div className={cn(['font-bold text-[14px]'])}>
                        {t('theme')}
                    </div>
                    <Toggle
                        id="darkmode"
                        value={theme === 'dark'}
                        callback={(mode) => {
                            setTheme(mode);
                        }}
                    />
                </NavItem>

                {/* 사용자 로그인/로그아웃 */}
                <NavItem>
                    <div
                        className={cn(
                            'btn-transparent text-[14px] cursor-pointer',
                        )}
                    >
                        {session ? (
                            <div onClick={() => signOut()}>{t('logout')}</div>
                        ) : (
                            <div onClick={() => router.push(LINK.AUTH.login)}>
                                {t('login')}
                            </div>
                        )}
                    </div>
                </NavItem>

                {/* 메뉴 버튼 */}
                <NavItem>
                    <div
                        className={cn('btn-transparent z-10')}
                        onClick={() => controlMenu()}
                    >
                        <FontAwesomeIcon
                            className={cn('cursor-pointer', {
                                ['text-black']: isMenuOpen,
                            })}
                            icon={faBars}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </NavItem>
            </div>
        </nav>
    );
};

export default Navbar;
