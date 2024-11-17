import { cn } from '@/module/util/cn';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const SkillBoxCell = ({ children }: Props) => (
    <div className={cn('w-40 text-center')}>{children}</div>
);

export default SkillBoxCell;
