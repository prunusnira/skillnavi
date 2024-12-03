'use client';

import { cn } from '@/module/util/cn';
import { useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/jotai/atomGameVersion';
import { useMemo } from 'react';

interface Props {
    versionId: number;
}

const SkillTableTitleVersion = ({ versionId }: Props) => {
    const versionList = useAtomValue(atomGameVersionList);

    const version = useMemo(() => {
        return versionList?.find((v) => v.id === versionId);
    }, [versionList]);

    return <section className={cn('flex-col-center')}>{version?.full}</section>;
};

export default SkillTableTitleVersion;
