'use client';

import { IMG, LINK_AUTH_LOGIN } from '@/url/url';
import NavItem from '@/feature/header/NavItem';
import useNavbar from '@/feature/header/navbar/useNavbar';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear } from '@fortawesome/free-solid-svg-icons';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from '@/i18n/routing';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { clsx } from 'clsx';

const Navbar = () => {
    const { isMenuOpen, handleLinkMain, controlMenu, controlOption } = useNavbar();
    const t = useTranslations('header');
    const { data: session } = useSession();
    const router = useRouter();

    return (
        <nav className={'w-full h-full flex-between'}>
            {/* left side (logo) */}
            <div
                className={'cursor-pointer flex-center gap-[8px]'}
                onClick={handleLinkMain}
            >
                <div className={'w-[40px] h-[40px]'}>
                    <Image
                        unoptimized={true}
                        alt={'icon'}
                        src={`${IMG}/header/logoidx.png`}
                        width={40}
                        height={40}
                    />
                </div>

                <div className={'hidden md:flex flex-col'}>
                    <div className={'text-sm'}>
                        GITADORA Series Skill Simulator
                    </div>
                    <div className={'text-xl'}>Skill Navigator</div>
                </div>
            </div>

            {/* right side */}
            <div className={'flex-center'}>
                {/* 디스코드 링크 */}
                <NavItem>
                    <div
                        className={'cursor-pointer'}
                        onClick={() =>
                            router.push(
                                process.env.NEXT_PUBLIC_URL_DISCORD || '',
                            )
                        }
                    >
                        <FontAwesomeIcon icon={faDiscord} />
                    </div>
                </NavItem>

                {/* 옵션메뉴 */}
                <NavItem>
                    <div
                        className={'cursor-pointer'}
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

                {/* 메뉴 버튼 */}
                <NavItem>
                    <div
                        className={'btn-transparent z-10'}
                        onClick={() => controlMenu()}
                    >
                        <FontAwesomeIcon
                            className={clsx('cursor-pointer', {
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
