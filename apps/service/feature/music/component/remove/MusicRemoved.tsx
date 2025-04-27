'use client';

import { useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/common/game/data/atomGameVersion';

interface Props {
    version: number;
}

// ALL 곡 삭제 정보
const MusicRemoved = ({ version }: Props) => {
    const versionList = useAtomValue(atomGameVersionList);
    const removeText = (version: number) => {
        return `removed in ${versionList?.find((v) => v.id === version)?.short ?? 'unknown'}`;
    };

    if (version === 0) {
        return null;
    }

    return (
        <div className={'text-sm text-red-500 font-bold'}>
            {removeText(version)}
        </div>
    );
};

export default MusicRemoved;
