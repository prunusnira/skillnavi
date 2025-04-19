import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';
import { atomEnv } from '@/feature/env/data/AtomEnv';

export const useSidebar = () => {
    const [
        env,
        setEnv,
    ] = useAtom(atomEnv);

    const pathname = usePathname();

    useEffect(() => {
        setEnv({ menu: false });
    }, [pathname]);

    return {
        isMenuOpen: env.menu,
    };
};
