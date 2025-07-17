import { RadioOptions } from './Radio.data';
import { RadioItem } from './Radio.item';

interface Props<T> {
    radioGroupName: string;
    itemList: RadioOptions[];
    currentValue: T;
    onChange: (value: T) => void;
    className?: string;
}

export const RadioGroup = <T extends string | number>({
    radioGroupName,
    itemList,
    currentValue,
    onChange,
    className,
}: Props<T>) => {
    return (
        <section className={'flex gap-[30px]'}>
            {itemList.map((item) => (
                <RadioItem<T>
                    key={item.id}
                    radioGroupName={radioGroupName}
                    item={item}
                    selected={currentValue === item.value}
                    onChange={onChange}
                    className={className}
                />
            ))}
        </section>
    );
};

export default RadioGroup;
