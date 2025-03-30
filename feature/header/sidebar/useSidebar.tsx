import { useAtom } from 'jotai';
import { Fragment, useEffect, useMemo } from 'react';
import { SidebarMenuItems, SidebarSubMenu } from '@/common/menu/SidebarMenu';
import { cn } from '@/lib/cn';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import Image from 'next/image';
import { atomEnv } from '@/feature/env/data/AtomEnv';

const useSidebar = () => {
    const [
        env,
        setEnv,
    ] = useAtom(atomEnv);
    const t = useTranslations('header');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setEnv({ menu: false });
    }, [pathname]);

    const renderSubMenu = (subMenu: SidebarSubMenu[]) => (
        <section className={cn('flex items-center gap-[16px]')}>
            {subMenu.map((sub) => (
                <div
                    key={sub.id}
                    className={cn('text-black cursor-pointer text-sm')}
                    onClick={() => {
                        router.push(sub.href);
                    }}
                >
                    {t(sub.id)}
                </div>
            ))}
        </section>
    );

    const menu = useMemo(
        () =>
            SidebarMenuItems.map((m) => (
                <Fragment key={m.id}>
                    <section
                        className={cn(
                            'w-full md:w-[768px] flex items-center gap-[8px]',
                        )}
                    >
                        <Image
                            unoptimized={true}
                            src={m.iconSrc}
                            alt="sidebar menu icon"
                            width={36}
                            height={36}
                        />
                        <div
                            className={cn('text-black text-md', {
                                ['cursor-pointer']: !!m.href,
                            })}
                            onClick={() => {
                                if (m.href) router.push(m.href);
                            }}
                        >
                            {t(`${m.id}.title`)}
                        </div>
                    </section>
                    {m.subMenu && renderSubMenu(m.subMenu)}
                </Fragment>
            )),
        [],
    );

    // 페이지를 이동하면 메뉴 닫기
    useEffect(() => {
        setEnv({ menu: false });
    }, []);

    return {
        isMenuOpen: env.menu,
        menu,
    };
};

export default useSidebar;
