import { ChangeEvent, useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/common/game/data/atomGameVersion';
import { TableDataType } from '@/feature/skill/data/TableDataType';
import { TableType } from '@/feature/skill/data/TableType';
import { GameType } from '@/common/game/data/GameType';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';

const useSkillMenu = () => {
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

    const versionSelectOption = useMemo(() => {
        return versionList?.map((ver) => (
            <option
                key={ver.id}
                value={ver.id}
            >
                {ver.full}
            </option>
        ));
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

    const onChangeVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        updateSearchParams('version', e.currentTarget.value);
    };

    const onChangeTable = (table: TableType) => {
        updateSearchParams('display', table);
    };

    const onChangeData = (data: TableDataType) => {
        updateSearchParams('pageType', data);
    };

    const onChangeGame = (data: GameType) => {
        updateSearchParams('game', data);
    };

    return {
        active,
        toggleMenu,
        versionSelectOption,
        onChangeVersion,
        onChangeTable,
        onChangeData,
        onChangeGame,
        currentVersion: Number(searchParams.get('version')),
    };
};

export default useSkillMenu;
