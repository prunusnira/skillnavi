import { ChangeEvent, useMemo, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/jotai/atomGameVersion';
import { atomSkillTableOptions } from '@/jotai/atomSkillTableOptions';
import { TableDataType } from '@/data/skill/TableDataType';
import { TableType } from '@/data/skill/TableType';
import { GameType } from '@/data/game/GameType';
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

    const [
        tableOptions,
        setTableOptions,
    ] = useAtom(atomSkillTableOptions);

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
        router.replace(`${pathname}?${newSearchParams.toString()}`);
    };

    const onChangeVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        setTableOptions({
            type: 'versionId',
            data: Number(e.currentTarget.value),
        });
        updateSearchParams('version', e.currentTarget.value);
    };

    const onChangeTable = (table: TableType) => {
        setTableOptions({
            type: 'table',
            data: table,
        });
        updateSearchParams('display', table);
    };

    const onChangeData = (data: TableDataType) => {
        setTableOptions({
            type: 'data',
            data,
        });
        updateSearchParams('pageType', data);
    };

    const onChangeGame = (data: GameType) => {
        setTableOptions({
            type: 'game',
            data,
        });
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
        tableOptions,
    };
};

export default useSkillMenu;
