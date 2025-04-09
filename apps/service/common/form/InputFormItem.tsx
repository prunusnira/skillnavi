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
                    'text-sm bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-500',
                    'border border-white rounded-2xl bg-transparent p-2',
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
