import { useMemo } from 'react';
import { cn } from '@/module/util/cn';
import { getSkillCN } from '@/module/api/skill/getSkillCN';

interface Props {
    value: number;
}

const SkillColor = ({ value }: Props) => {
    const className = useMemo(() => getSkillCN(value), [value]);
    return <div className={cn(className, 'skill-text')}>{value}</div>;
};

export default SkillColor;
