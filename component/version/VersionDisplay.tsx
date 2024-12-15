'use client';

import { useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/jotai/atomGameVersion';
import { useMemo } from 'react';

interface Props {
    version: number;
    type: 'short' | 'full';
    className?: string;
}

const VersionDisplay = ({ version, type, className }: Props) => {
    const versionList = useAtomValue(atomGameVersionList);
    const displayVersion = useMemo(() => {
        if (!versionList) return undefined;

        const selected = versionList.find((v) => {
            if (v.id === version) {
                return v;
            }
        });

        if (!selected) return undefined;

        if (type === 'full') return selected.full;
        else return selected.short;
    }, [versionList]);

    return <div className={className}>{displayVersion}</div>;
};

export default VersionDisplay;
