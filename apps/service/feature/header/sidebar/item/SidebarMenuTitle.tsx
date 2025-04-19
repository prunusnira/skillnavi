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
                'flex gap-[8px] items-center', {
                    ['cursor-pointer']: href !== undefined,
                    ['cursor-no-drop']: href === undefined,
                },
            )}
            href={href ?? ''}
            aria-disabled={href === undefined}
        >
            {/* 아이콘 */}
            <div
                className={'bg-black rounded-xl p-[4px]'}
            >
                <Image src={iconSrc} alt={'icon'} width={35} height={35} />
            </div>

            {/* 타이틀 */}
            <div className={'text-lg font-semibold text-black'}>{t(id)}</div>
        </Link>
    );
};