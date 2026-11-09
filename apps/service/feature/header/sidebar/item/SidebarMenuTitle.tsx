import { SidebarMenu } from '@/common/menu/SidebarMenu';
import Image from 'next/image';
import { clsx } from 'clsx';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export const SidebarMenuTitle = async ({ id, iconSrc, href }: SidebarMenu) => {
    const t = await getTranslations('sidemenu');

    return (
        <Link
            className={clsx(
                'flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2.5 text-white transition-all hover:border-lime-300/25 hover:bg-lime-300/10 hover:text-lime-200',
                {
                    ['cursor-pointer']: href !== undefined,
                    ['cursor-no-drop']: href === undefined,
                },
            )}
            href={href ?? ''}
            aria-disabled={href === undefined}
        >
            {/* 아이콘 */}
            <div
                className={
                    'rounded-xl bg-slate-950 p-1 shadow-sm ring-1 ring-white/10'
                }
            >
                <Image src={iconSrc} alt={'icon'} width={35} height={35} />
            </div>

            {/* 타이틀 */}
            <div className={'text-lg font-semibold'}>{t(id)}</div>
        </Link>
    );
};
