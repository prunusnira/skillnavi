import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const SkillBoxCell = ({ children }: Props) => (
    <div className={cn('w-40 text-center text-white')}>{children}</div>
);

export default SkillBoxCell;
