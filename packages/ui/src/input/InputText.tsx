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
            className={clsx(
                'min-h-10 rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-950 shadow-sm transition-colors',
                'placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20',
                'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500',
                customClass,
            )}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            value={value}
        />
    );
};
