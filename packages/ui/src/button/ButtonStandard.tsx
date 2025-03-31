import { useMemo } from 'react';
import { clsx } from 'clsx';

interface Props {
    iconUrl?: string;
    text: string;
    onClick?: () => void;
    size?: number;
    isSelected?: boolean;
    disabled?: boolean;

    // 커스터마이즈 가능한 tailwind 클래스
    customDisabledClass?: string;
    customSelectedClass?: string;
    customClass?: string;
}

export const ButtonStandard = (
    {
        iconUrl,
        text,
        onClick,
        size,
        isSelected,
        disabled,
        customDisabledClass,
        customSelectedClass,
        customClass,
    }: Props,
) => {
    const color = useMemo(() => {
        if (isSelected) {
            return customSelectedClass || 'bg-green-500 text-white';
        }
        if (disabled) {
            return customDisabledClass || 'bg-blue-200 text-white';
        }
        return customClass || 'bg-blue-400 text-white';
    }, [disabled, isSelected]);

    return (
        <section
            className={
                clsx(color, 'flex-center rounded-xl cursor-pointer px-4 py-2')
            }
            onClick={() => {
                if (!disabled && onClick) {
                    onClick();
                }
            }}
        >
            {iconUrl && (
                <img
                    alt="btn icon"
                    src={iconUrl}
                    width={size || 32}
                    height={size || 32}
                />
            )}
            <div>{text}</div>
        </section>
    );
};
