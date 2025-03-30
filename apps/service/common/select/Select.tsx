import { cn } from '@/lib/cn';
import { ChangeEventHandler, ReactNode } from 'react';

interface Props {
    options: ReactNode;
    value: number | string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
}

const Select = ({ options, value, onChange }: Props) => {
    return (
        <select
            className={cn('rounded-2xl px-4 py-2')}
            value={value}
            onChange={onChange}
        >
            {options}
        </select>
    );
};

export default Select;
