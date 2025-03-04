import { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface Props {
    children: ReactNode;
}

const SkillBoxRow = ({ children }: Props) => (
    <div className={cn('flex justify-center items-center')}>{children}</div>
);

export default SkillBoxRow;
