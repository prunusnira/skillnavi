import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CheckboxItemType } from '../data/Checkbox.type';

interface Props<T> {
    group: string;
    item: CheckboxItemType<T>;
    action: (value: T, checked: boolean) => void;
}

export const CheckboxItem = <T extends string>({
    group,
    item,
    action,
}: Props<T>) => {
    return (
        <div
            className={
                'flex cursor-pointer justify-center items-center gap-[4px]'
            }
            onClick={(e) => {
                e.preventDefault();
                action(item.value, !item.checked);
            }}
        >
            {/* checker */}
            <div
                className={'border border-solid border-white'}
                style={{
                    width: 21,
                    height: 21,
                }}
            >
                {item.checked && (
                    <FontAwesomeIcon
                        className={'m-auto'}
                        width={16}
                        height={16}
                        icon={faCheck}
                    />
                )}
            </div>

            {/* text */}
            <span>{item.display}</span>

            {/* actual input */}
            <input
                type={'checkbox'}
                value={item.value}
                name={group}
                hidden
            />
        </div>
    );
};
