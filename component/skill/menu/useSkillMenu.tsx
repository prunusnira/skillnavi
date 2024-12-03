import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomGameVersionList } from '@/jotai/atomGameVersion';
import { useSearchParams } from 'next/navigation';
import {
    atomSkillTableOptions,
    atomSkillTableOptionsInit,
} from '@/jotai/atomSkillTableOptions';
import { TableDataType } from '@/data/skill/TableDataType';
import { TableType } from '@/data/skill/TableType';

const useSkillMenu = () => {
    const versionList = useAtomValue(atomGameVersionList);
    const searchParams = useSearchParams();

    const [
        active,
        setActive,
    ] = useState<boolean>(false);

    const [
        tableOptions,
        setTableOptions,
    ] = useAtom(atomSkillTableOptions);
    const setInit = useSetAtom(atomSkillTableOptionsInit);

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

    const onChangeVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        setTableOptions({
            type: 'versionId',
            data: Number(e.currentTarget.value),
        });
    };

    const onChangeTable = (table: TableType) => {
        setTableOptions({
            type: 'table',
            data: table,
        });
    };

    const onChangeData = (data: TableDataType) => {
        setTableOptions({
            type: 'data',
            data,
        });
    };

    useEffect(() => {
        setInit({
            versionId: Number(searchParams.get('version') || 0),
            table: (searchParams.get('display') as TableType) || 'grid',
            data: (searchParams.get('pageType') as TableDataType) || 'target',
        });
    }, [searchParams]);

    return {
        active,
        toggleMenu,
        versionSelectOption,
        onChangeVersion,
        onChangeTable,
        onChangeData,
        tableOptions,
    };
};

export default useSkillMenu;
