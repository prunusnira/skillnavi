import { useAtom } from 'jotai/index';
import { atomEnv } from '@/jotai/atomEnv';
import { useRouter } from 'next-nprogress-bar';
import { LINK } from '@/data/url';
import { useMemo } from 'react';

const useNavbar = () => {
    const [
        env,
        setEnv,
    ] = useAtom(atomEnv);
    const router = useRouter();

    const handleLinkMain = () => {
        router.push(LINK.MAIN);
    };

    const setTheme = (mode: boolean) => {
        const theme = mode ? 'dark' : 'light';
        setEnv({ type: 'theme', data: theme });
    };

    const theme = useMemo(() => env.theme, [env]);

    return {
        theme,
        setTheme,
        handleLinkMain,
    };
};

export default useNavbar;
