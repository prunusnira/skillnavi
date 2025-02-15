import { useAtomValue } from 'jotai';
import { atomEnv } from '@/jotai/atomEnv';
import { Fragment, useMemo } from 'react';
import { SidebarMenuItems, SidebarSubMenu } from '@/data/menu/SidebarMenu';
import { cn } from '@/module/util/cn';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import Image from 'next/image';

const useSidebar = () => {
    const env = useAtomValue(atomEnv);
    const t = useTranslations('header');
    const router = useRouter();

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

    return {
        isMenuOpen: env.menu,
        menu,
    };
};

export default useSidebar;
