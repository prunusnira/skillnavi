'use client';

import useSkillVersion from '@/feature/skill/component/table/useSkillVersion';

interface Props {
    versionId: number;
    type: 'short' | 'full';
}

const SkillItemVersion = ({ versionId }: Props) => {
    const { version } = useSkillVersion({ versionId });

    return <div className={'text-sm'}>{version?.short}</div>;
};

export default SkillItemVersion;
