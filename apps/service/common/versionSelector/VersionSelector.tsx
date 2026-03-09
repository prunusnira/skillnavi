'use client';

import { Select, SelectOption } from '@skillnavi/ui';
import { ChangeEvent, useMemo } from 'react';
import { useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/common/game/data/atomGameVersion';

interface Props {
    onChangeVersion: (e: ChangeEvent<HTMLSelectElement>) => void;
    currentVersion: number;
    withoutAll?: boolean;
    versionFrom?: number;
    disabledUntil?: number;
}

export const VersionSelector = ({
    onChangeVersion,
    currentVersion,
    withoutAll,
    versionFrom,
    disabledUntil,
}: Props) => {
    const versionList = useAtomValue(atomGameVersionList);

    const versionSelectOption: SelectOption[] | undefined = useMemo(() => {
        let list = versionList;
        if (withoutAll) {
            list = versionList?.filter((version) => version.id !== 0);
        }
        if (versionFrom) {
            list = list?.filter((version) => version.id >= versionFrom);
        }
        return list?.map((ver) => ({
            value: ver.id.toString(),
            display: ver.full,
            disabled: disabledUntil ? ver.id <= disabledUntil : false,
        }));
    }, [
        versionFrom,
        versionList,
        withoutAll,
        disabledUntil,
    ]);

    return (
        <Select
            onChange={onChangeVersion}
            options={versionSelectOption || []}
            value={currentVersion}
        />
    );
};
