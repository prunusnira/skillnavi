import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const SkillBoxRow = ({ children }: Props) => (
    <div className={'flex justify-center items-center'}>{children}</div>
);

export default SkillBoxRow;
