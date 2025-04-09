import { ReactNode, useMemo } from 'react';
import { clsx } from 'clsx';

interface Props {
    icon?: ReactNode;
    text: string;
    onClick?: () => void;
    fixedWidth?: number;
    isSelected?: boolean;
    disabled?: boolean;

    // 커스터마이즈 가능한 tailwind 클래스
    customDisabledClass?: string;
    customSelectedClass?: string;
    customClass?: string;
}

export const ButtonRounded = (
    {
        icon,
        text,
        onClick,
        fixedWidth,
        isSelected,
        disabled,
        customDisabledClass,
        customSelectedClass,
        customClass,
    }: Props,
) => {
    const color = useMemo(() => {
        if (disabled) {
            return customDisabledClass || 'bg-gray-500, text-white border-gray-500';
        }
        if (isSelected) {
            return customSelectedClass || 'bg-black text-white border-gray-500';
        }
        return customClass || 'bg-transparent text-black border-black dark:border-white dark:text-white';
    }, [isSelected, disabled]);

    return (
        <button
            className={clsx(
                'flex-center border rounded-2xl px-2 py-1',
                color,
            )}
            onClick={onClick}
            style={{
                width: fixedWidth,
            }}
            disabled={disabled}
        >
            {icon}
            <div className={'text-sm'}>{text}</div>
        </button>
    );
};
