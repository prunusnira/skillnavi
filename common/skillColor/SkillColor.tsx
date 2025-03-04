import { useMemo } from 'react';
import { cn } from '@/lib/cn';
import { getSkillCN } from '@/feature/skill/api/getSkillCN';

interface Props {
    value: number;
    multiplier?: number;
}

const SkillColor = ({ value, multiplier = 1 }: Props) => {
    const className = useMemo(() => getSkillCN(value * multiplier), [value]);
    return (
        <div className={cn(className, 'skill-text')}>{value.toFixed(2)}</div>
    );
};

export default SkillColor;
