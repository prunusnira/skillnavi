import { ChangeEventHandler } from 'react';
import { SelectOption } from './SelectOption';

interface Props {
    options: SelectOption[];
    value: number | string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const Select = ({ options, value, onChange }: Props) => {
    return (
        <select
            className={
                'min-h-10 rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50'
            }
            value={value}
            onChange={onChange}
        >
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                >
                    {option.display}
                </option>
            ))}
        </select>
    );
};
