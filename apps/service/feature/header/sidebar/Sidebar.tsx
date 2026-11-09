import { SidebarMenu, SidebarMenuItems } from '@/common/menu/SidebarMenu';
import { SidebarWrapper } from '@/feature/header/sidebar/item/SidebarWrapper';
import { SidebarMenuTitle } from '@/feature/header/sidebar/item/SidebarMenuTitle';
import { SidebarBox } from '@/feature/header/sidebar/item/SidebarBox';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { SidebarSearch } from '@/feature/header/sidebar/item/SidebarSearch';

const Sidebar = async () => {
    const keys = Object.keys(
        SidebarMenuItems,
    ) as (keyof typeof SidebarMenuItems)[];
    const t = await getTranslations('sidemenu');

    return (
        <SidebarWrapper>
            <SidebarSearch />

            {keys.map((key) => {
                const menu = SidebarMenuItems[key] as SidebarMenu;

                return (
                    <section
                        key={`sidebar_${key}`}
                        className={
                            'flex w-full max-w-3xl flex-col border-b border-white/10 pb-4 last:border-b-0'
                        }
                    >
                        <SidebarMenuTitle
                            id={menu.id}
                            iconSrc={menu.iconSrc}
                            href={menu.href}
                        />
                        {menu.subMenu && menu.subMenu.length > 0 && (
                            <SidebarBox>
                                {menu.subMenu.map((menu) => (
                                    <Link
                                        key={menu.id}
                                        href={menu.href}
                                        className={
                                            'rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-lime-200'
                                        }
                                    >
                                        {t(menu.id)}
                                    </Link>
                                ))}
                            </SidebarBox>
                        )}
                    </section>
                );
            })}
        </SidebarWrapper>
    );
};

export default Sidebar;
