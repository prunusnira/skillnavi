'use client';

import { useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/common/game/data/atomGameVersion';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChangeEvent, useMemo, useState } from 'react';
import { SelectOption } from '@/common/select/SelectOption';

export const usePatternMenu = () => {
    const versionList = useAtomValue(atomGameVersionList);
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

    const versionSelectOption: SelectOption[] | undefined = useMemo(() => {
        return versionList?.map((ver) => ({
            value: ver.id.toString(),
            display: ver.full,
        }));
    }, [versionList]);

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

    const onChangeMusicVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        updateSearchParams('musicVersion', e.currentTarget.value);
    };

    const onChangeGameVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        updateSearchParams('gameVersion', e.currentTarget.value);
    };

    return {
        active,
        toggleMenu,
        versionSelectOption,
        onChangeMusicVersion,
        onChangeGameVersion,
        currentMusicVersion: Number(searchParams.get('musicVersion')),
        currentGameVersion: Number(searchParams.get('gameVersion')),
    };
};
