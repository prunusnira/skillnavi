import { clsx } from 'clsx';
import { ChangeEvent, FocusEvent } from 'react';

interface Props {
    customClass: string;
    placeholder?: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const InputText = ({
    customClass,
    placeholder,
    value,
    onChange,
    onBlur,
}: Props) => {
    return (
        <input
            className={clsx('p-[10px] rounded-[25px]', customClass)}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            value={value}
        />
    );
};
