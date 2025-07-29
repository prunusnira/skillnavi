import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const SkillBoxCell = ({ children }: Props) => (
    <div className={'w-[160px] text-center text-white'}>{children}</div>
);

export default SkillBoxCell;
