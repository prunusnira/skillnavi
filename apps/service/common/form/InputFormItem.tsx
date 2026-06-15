import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { cn } from '@/lib/cn';

interface Props {
    label: string;
    placeholder: string;
    id: string;
    type: HTMLInputTypeAttribute;
    labelWidth?: number;
    inputWidth?: number;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputFormItem = ({
    label,
    placeholder,
    id,
    type,
    labelWidth,
    inputWidth,
    value,
    onChange,
}: Props) => {
    return (
        <div className={cn('flex-center')}>
            <label
                className={cn('text-sm text-center')}
                htmlFor={id}
                style={{
                    width: labelWidth,
                }}
            >
                {label}
            </label>
            <input
                className={cn(
                    'rounded-xl border border-slate-300 bg-white p-2 text-sm text-slate-950 shadow-sm',
                    'placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
                    'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500',
                )}
                id={id}
                type={type}
                placeholder={placeholder}
                style={{
                    width: inputWidth,
                }}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputFormItem;
