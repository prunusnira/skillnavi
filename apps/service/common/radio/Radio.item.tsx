import { RadioOptions } from '@/common/radio/Radio.data';
import style from './Radio.item.module.scss';

interface Props<T> {
    radioGroupName: string;
    item: RadioOptions;
    selected: boolean;
    onChange: (value: T) => void;
}

const RadioItem = <T extends string | number>({
    radioGroupName,
    item,
    selected,
    onChange,
}: Props<T>) => {
    return (
        <label
            htmlFor={item.id}
            className={
                'flex justify-center items-center gap-[10px] cursor-pointer'
            }
        >
            <input
                className={style.radioButton}
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

export default RadioItem;
