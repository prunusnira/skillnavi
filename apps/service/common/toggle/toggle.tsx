'use client';

import { cn } from '@/lib/cn';
import { useEffect, useState } from 'react';

interface Props {
    id: string;
    isLoading?: boolean;
    value: boolean;
    callback: (b: boolean) => void;
}

const Toggle = ({ id, isLoading, value, callback }: Props) => {
    const [
        active,
        setActive,
    ] = useState(value || false);

    useEffect(() => {
        setActive(value);
        console.log(value);
    }, [value]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked);
    };

    return (
        <div className={cn(['relative w-[36px] flex-col-center'])}>
            <input
                hidden
                type="checkbox"
                checked={active}
                onChange={onChange}
                disabled={isLoading}
                id={`chkbox_${id}`}
            />
            <label
                htmlFor={`chkbox_${id}`}
                className={cn([
                    'relative w-full h-[14px] rounded-[50px] cursor-pointer',
                    active ? 'bg-teal-500' : 'bg-gray-500',
                ])}
            >
                <span
                    className={cn([
                        `absolute w-[20px] h-[20px]
                         rounded-full shadow-toggle
                         border-solid border border-black/15
                         bg-white top-1/2`,
                        active ? 'animate-toggleOn' : 'animate-toggleOff',
                    ])}
                />
            </label>
        </div>
    );
};

export default Toggle;
