import { useEffect, useRef } from 'react';
import { CookieParser } from '@skillnavi/data/src/cookie';
import { useCookie } from '@/feature/cookie/hook/useCookie';
import { useAtom } from 'jotai';
import { atomEnv } from '@/feature/env/data/AtomEnv';

const useTheme = () => {
    const [env, setEnv] = useAtom(atomEnv);
    const { update } = useCookie();
    const cookieParser = useRef<CookieParser>(CookieParser.getInstance());

    const initCookies = () => {
        if (typeof window !== 'undefined') {
            cookieParser.current.parseCookie(document.cookie);
        }
    };

    const loadTheme = () => {
        const theme = cookieParser.current.getCookie('theme');
        if (!theme) return;

        if (theme) {
            const themeStr = theme as 'light' | 'dark';
            changeTheme(themeStr);
            setEnv({ theme: themeStr });
        } else {
            changeTheme('light');
            setEnv({ theme: 'light' });
        }
    };

    const changeTheme = (theme: 'light' | 'dark') => {
        update({
            key: 'theme',
            value: theme,
        });
        setEnv({ theme });
    };

    useEffect(() => {
        initCookies();
    }, []);

    useEffect(() => {
        if (env.theme === 'dark') {
            document.getElementsByTagName('html')[0]!.classList.add('dark');
        } else {
            document.getElementsByTagName('html')[0]!.classList.remove('dark');
        }
    }, [env]);

    return {
        theme: env.theme,
        loadTheme,
        changeTheme,
    };
};

export default useTheme;