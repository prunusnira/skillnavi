import { useAtom } from 'jotai/index';
import { LINK_MAIN } from '@/url/url';
import { useMemo } from 'react';
import { useRouter } from '@/i18n/routing';
import { atomEnv } from '@/feature/env/data/AtomEnv';

const useNavbar = () => {
    const [
        env,
        setEnv,
    ] = useAtom(atomEnv);
    const router = useRouter();

    const handleLinkMain = () => {
        router.push(LINK_MAIN);
    };

    const setTheme = (mode: boolean) => {
        const theme = mode ? 'dark' : 'light';
        setEnv({ type: 'theme', data: theme });
    };

    const controlMenu = () => {
        setEnv({ type: 'menu', data: !env.menu });
    };

    const theme = useMemo(() => env.theme, [env]);

    return {
        isMenuOpen: env.menu,
        theme,
        setTheme,
        handleLinkMain,
        controlMenu,
    };
};

export default useNavbar;
