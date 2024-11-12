import { HTMLInputTypeAttribute } from 'react';
import { cn } from '@/module/util/cn';

interface Props {
    label: string;
    placeholder: string;
    id: string;
    type: HTMLInputTypeAttribute;
    labelWidth?: number;
    inputWidth?: number;
}

const InputFormItem = ({
    label,
    placeholder,
    id,
    type,
    labelWidth,
    inputWidth,
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
                    'text-sm bg-white text-black placeholder-gray-500',
                    'border border-white rounded-2xl bg-transparent p-2',
                )}
                id={id}
                type={type}
                placeholder={placeholder}
                style={{
                    width: inputWidth,
                }}
            />
        </div>
    );
};

export default InputFormItem;
