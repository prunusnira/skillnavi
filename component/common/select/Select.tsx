import { cn } from '@/module/util/cn';
import { ReactNode } from 'react';

interface Props {
    options: ReactNode;
}

const Select = ({ options }: Props) => {
    return <select className={cn('rounded-2xl px-4 py-2')}>{options}</select>;
};

export default Select;
