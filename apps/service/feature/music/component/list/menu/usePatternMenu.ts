'use client';

import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { useState } from 'react';

export const usePatternMenu = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [
        active,
        setActive,
    ] = useState<boolean>(false);

    const toggleMenu = () => {
        setActive(!active);
    };

    const updateSearchParams = (targetKey: string, targetValue: string) => {
        const newSearchParams = new URLSearchParams();
        const keys = Array.from(searchParams.keys());
        keys.forEach((key) => {
            if (searchParams.has(key)) {
                newSearchParams.set(key, searchParams.get(key) || '');
            }
        });
        newSearchParams.set(targetKey, targetValue);
        router.push(`${pathname}?${newSearchParams.toString()}`);
    };

    return {
        updateSearchParams,
        active,
        toggleMenu,
    };
};
