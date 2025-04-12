'use client';

import useSkillVersion from '@/feature/skill/component/table/useSkillVersion';

interface Props {
    versionId: number;
    type: 'short' | 'full';
    className?: string;
}

const SkillItemVersion = ({ versionId, type, className }: Props) => {
    const { version } = useSkillVersion({ versionId });

    return <div className={className}>{type === 'short' ? version?.short : version?.full}</div>;
};

export default SkillItemVersion;
