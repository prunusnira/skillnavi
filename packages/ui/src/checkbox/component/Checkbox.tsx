'use client';

import { CheckboxItemType } from '../data/Checkbox.type';
import { CheckboxItem } from './Checkbox.item';

interface Props<T> {
    group: string;
    items: CheckboxItemType<T>[];
    action: (value: T, checked: boolean) => void;
}

export const Checkbox = <T extends string>({
    group,
    items,
    action,
}: Props<T>) => {
    return (
        <>
            {items.map((item) => (
                <CheckboxItem
                    key={item.value}
                    item={item}
                    group={group}
                    action={action}
                />
            ))}
        </>
    );
};
