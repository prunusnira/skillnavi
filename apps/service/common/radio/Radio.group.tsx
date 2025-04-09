import { RadioOptions } from '@/common/radio/Radio.data';
import RadioItem from '@/common/radio/Radio.item';

interface Props<T> {
    radioGroupName: string;
    itemList: RadioOptions[];
    currentValue: T;
    onChange: (value: T) => void;
}

const RadioGroup = <T extends string | number>({
                                                   radioGroupName,
                                                   itemList,
                                                   currentValue,
                                                   onChange,
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
                />
            ))}
        </section>
    );
};

export default RadioGroup;
