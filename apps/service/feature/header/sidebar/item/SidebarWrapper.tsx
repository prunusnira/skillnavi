'use client';

import { cn } from '@/lib/cn';
import { useSidebar } from '@/feature/header/sidebar/useSidebar';
import { PropsWithChildren } from 'react';

export const SidebarWrapper = ({ children }: PropsWithChildren) => {
    const { isMenuOpen } = useSidebar();
    return (
        <section
            className={cn(
                'flex flex-col items-center gap-[16px] py-[90px] px-[16px]',
                'transition-[right] duration-200 ease-in-out',
                'fixed w-full h-screen top-0 overflow-y-scroll',
                'bg-[linear-gradient(#000000dd,#ffffffdd,#ffffffdd,#ffffffdd,#ffffffdd,#ffffffdd,#ffffffdd,#ffffffdd,#ffffffdd,#ffffffdd)]',
                {
                    ['right-0']: isMenuOpen,
                    ['-right-full']: !isMenuOpen,
                },
            )}
        >
            {children}
        </section>
    );
};
