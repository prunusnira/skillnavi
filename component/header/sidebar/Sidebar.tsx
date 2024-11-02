'use client';

import { cn } from '@/module/util/cn';
import useSidebar from '@/component/header/sidebar/useSidebar';

const Sidebar = () => {
    const { isMenuOpen, menu } = useSidebar();
    // transition: right 0.5s ease-in-out
    return (
        <section
            className={cn(
                'flex flex-col items-center gap-[16px] pt-[90px] px-[16px] transition-[right] duration-200 ease-in-out bg-white bg-opacity-85 absolute w-full h-full top-0',
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
