import { RadioOptions } from './Radio.data';

interface Props<T> {
    radioGroupName: string;
    item: RadioOptions;
    selected: boolean;
    onChange: (value: T) => void;
    className?: string;
}

export const RadioItem = <T extends string | number>({
    radioGroupName,
    item,
    selected,
    onChange,
    className,
}: Props<T>) => {
    return (
        <label
            htmlFor={item.id}
            className={
                'flex justify-center items-center gap-[10px] cursor-pointer'
            }
        >
            <input
                className={className}
                name={radioGroupName}
                id={item.id}
                value={item.value}
                disabled={item.disabled || false}
                type="radio"
                checked={selected}
                onChange={(e) => onChange(e.currentTarget.value as T)}
            />
            <span className={'text-md'}>{item.display}</span>
        </label>
    );
};
