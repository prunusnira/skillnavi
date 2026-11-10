import type { ChangeEventHandler, ReactNode } from 'react';

interface ButtonRoundedProps {
    text: string;
    onClick?: () => void;
    isSelected?: boolean;
}

export const ButtonRounded = ({
    text,
    onClick,
    isSelected,
}: ButtonRoundedProps) => (
    <button
        type="button"
        data-selected={isSelected ? 'true' : 'false'}
        onClick={onClick}
    >
        {text}
    </button>
);

interface SelectOption {
    value: string;
    display: ReactNode;
    disabled?: boolean;
}

interface SelectProps {
    options: SelectOption[];
    value: number | string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const Select = ({ options, value, onChange }: SelectProps) => (
    <select
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
