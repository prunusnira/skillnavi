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
    excludedVersions?: number[];
}

export const VersionSelector = ({
    onChangeVersion,
    currentVersion,
    withoutAll,
    versionFrom,
    disabledUntil,
    excludedVersions,
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
        if (excludedVersions?.length) {
            list = list?.filter(
                (version) => !excludedVersions.includes(version.id),
            );
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
        excludedVersions,
    ]);

    return (
        <Select
            onChange={onChangeVersion}
            options={versionSelectOption || []}
            value={currentVersion}
        />
    );
};
