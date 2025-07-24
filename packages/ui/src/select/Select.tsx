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
            className={'rounded-2xl px-4 py-2 text-black bg-white'}
            value={value}
            onChange={onChange}
        >
            {options.map((option) => (
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.display}
                </option>
            ))}
        </select>
    );
};
