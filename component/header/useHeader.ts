'use client';

import { useAtom } from 'jotai';
import { atomEnv } from '@/jotai/atomEnv';
import { useEffect } from 'react';

const useHeader = () => {
    const [
        env,
        setEnv,
    ] = useAtom(atomEnv);

    // 메뉴 토글
    const toggleMenu = () => {
        setEnv({ type: 'menu', data: !env.menu });
    };

    // 스크롤에 따라 메뉴 투명도 조절
    const setTransparency = () => {
        if (window) {
            if (window.scrollY > 100) {
                setEnv({ type: 'transparency', data: false });
            } else {
                setEnv({ type: 'transparency', data: true });
            }
        }
    };
    useEffect(() => {
        if (window) {
            window.addEventListener('scroll', setTransparency);
            return () => {
                window.removeEventListener('scroll', setTransparency);
            };
        }
    }, []);

    return { toggleMenu };
};

export default useHeader;
