import { useAtom } from 'jotai/index';
import { LINK_MAIN } from '@/url/url';
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

    const controlMenu = () => {
        setEnv({ menu: !env.menu });
    };

    const controlOption = () => {
        setEnv({ option: !env.option });
    };

    return {
        isMenuOpen: env.menu,
        handleLinkMain,
        controlMenu,
        controlOption,
    };
};

export default useNavbar;
