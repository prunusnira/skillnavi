'use client';

import useSkillVersion from '@/component/skill/table/useSkillVersion';

interface Props {
    versionId: number;
    type: 'short' | 'full';
}

const SkillItemVersion = ({ versionId }: Props) => {
    const { version } = useSkillVersion({ versionId });

    return <div>{version?.short}</div>;
};

export default SkillItemVersion;
