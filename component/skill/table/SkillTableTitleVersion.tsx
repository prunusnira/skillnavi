'use client';

import { cn } from '@/module/util/cn';
import { useAtomValue } from 'jotai';
import {
    atomGameVersionLatest,
    atomGameVersionList,
} from '@/jotai/atomGameVersion';
import { useMemo } from 'react';

interface Props {
    versionId: number;
}

const SkillTableTitleVersion = ({ versionId }: Props) => {
    const versionList = useAtomValue(atomGameVersionList);
    const latest = useAtomValue(atomGameVersionLatest);

    const version = useMemo(() => {
        if (Number(versionId) === 0) {
            return latest;
        }
        return versionList?.find((v) => Number(v.id) === Number(versionId));
    }, [versionList]);

    return <section className={cn('flex-col-center')}>{version?.full}</section>;
};

export default SkillTableTitleVersion;
