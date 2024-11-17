import { ReactNode } from 'react';
import { cn } from '@/module/util/cn';

interface Props {
    children: ReactNode;
}

const SkillBoxRow = ({ children }: Props) => (
    <div className={cn('flex justify-center items-center')}>{children}</div>
);

export default SkillBoxRow;
