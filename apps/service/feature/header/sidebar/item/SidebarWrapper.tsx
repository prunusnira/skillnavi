'use client';

import { cn } from '@/lib/cn';
import { useSidebar } from '@/feature/header/sidebar/useSidebar';
import { PropsWithChildren } from 'react';

export const SidebarWrapper = ({ children }: PropsWithChildren) => {
    const { isMenuOpen } = useSidebar();
    return (
        <section
            className={cn(
                'z-40 flex flex-col items-center gap-5 px-4 pb-10 pt-24 sm:px-6',
                'transition-[right] duration-200 ease-in-out',
                'fixed top-0 h-screen w-full overflow-y-auto',
                'bg-slate-50/95 backdrop-blur-xl dark:bg-slate-950/95',
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
