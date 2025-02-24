import { useAtom } from 'jotai/index';
import { atomEnv } from '@/jotai/atomEnv';
import { LINK_MAIN } from '@/url/url';
import { useMemo } from 'react';
import { useRouter } from '@/i18n/routing';

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
