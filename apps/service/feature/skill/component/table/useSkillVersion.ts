import { useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/common/game/data/atomGameVersion';
import { useMemo } from 'react';

interface Props {
    versionId: number;
}

const useSkillVersion = ({ versionId }: Props) => {
    const versionList = useAtomValue(atomGameVersionList);

    const version = useMemo(() => {
        return versionList?.find((v) => v.id === versionId);
    }, [versionList]);

    return { version };
};

export default useSkillVersion;
