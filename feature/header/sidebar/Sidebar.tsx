'use client';

import { cn } from '@/lib/cn';
import useSidebar from '@/feature/header/sidebar/useSidebar';

const Sidebar = () => {
    const { isMenuOpen, menu } = useSidebar();

    return (
        <section
            className={cn(
                'flex flex-col items-center gap-[16px] pt-[90px] px-[16px] transition-[right] duration-200 ease-in-out bg-white bg-opacity-85 absolute w-full h-screen top-0',
                {
                    ['right-0']: isMenuOpen,
                    ['-right-full']: !isMenuOpen,
                },
            )}
        >
            {menu}
        </section>
    );
};

export default Sidebar;
