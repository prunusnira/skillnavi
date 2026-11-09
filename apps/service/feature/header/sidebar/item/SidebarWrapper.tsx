'use client';

import { cn } from '@/lib/cn';
import { useSidebar } from '@/feature/header/sidebar/useSidebar';
import { PropsWithChildren } from 'react';

export const SidebarWrapper = ({ children }: PropsWithChildren) => {
    const { isMenuOpen, closeMenu } = useSidebar();
    return (
        <>
            {isMenuOpen && (
                <button
                    type="button"
                    aria-label="Close navigation menu"
                    className="fixed inset-0 z-40 cursor-pointer bg-slate-950/20 backdrop-blur-[2px]"
                    onClick={closeMenu}
                />
            )}
            <section
                id="primary-navigation"
                aria-hidden={!isMenuOpen}
                inert={!isMenuOpen}
                className={cn(
                    'navigation-drawer fixed inset-y-0 right-0 z-50 flex h-[100dvh] w-full max-w-[28rem] flex-col items-center gap-5 overflow-y-auto rounded-l-[1.75rem] border-l px-4 pb-8 pt-24 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:px-6',
                    'transition-transform duration-300 ease-out',
                    {
                        ['translate-x-0 pointer-events-auto']: isMenuOpen,
                        ['translate-x-full pointer-events-none']: !isMenuOpen,
                    },
                )}
            >
                {children}
            </section>
        </>
    );
};
