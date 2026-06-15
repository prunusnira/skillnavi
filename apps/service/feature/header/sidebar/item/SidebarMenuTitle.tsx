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
                'flex items-center gap-3 rounded-xl p-1 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400',
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
                    'rounded-xl bg-slate-900 p-1 ring-1 ring-slate-700 dark:bg-slate-800'
                }
            >
                <Image
                    src={iconSrc}
                    alt={'icon'}
                    width={35}
                    height={35}
                />
            </div>

            {/* 타이틀 */}
            <div className={'text-lg font-semibold'}>{t(id)}</div>
        </Link>
    );
};
