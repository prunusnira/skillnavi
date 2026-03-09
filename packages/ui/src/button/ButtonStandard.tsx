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
    customTextClass?: string;
    customButtonClass?: string;
}

export const ButtonStandard = ({
    iconUrl,
    text,
    onClick,
    size,
    isSelected,
    disabled,
    customDisabledClass,
    customSelectedClass,
    customTextClass,
    customButtonClass,
}: Props) => {
    const color = useMemo(() => {
        if (isSelected) {
            return customSelectedClass || 'bg-green-500 text-white';
        }
        if (disabled) {
            return customDisabledClass || 'bg-blue-200 text-white';
        }
        return customTextClass || 'bg-blue-500 text-white';
    }, [
        disabled,
        isSelected,
    ]);

    return (
        <section
            className={clsx(
                color,
                'flex-center rounded-xl cursor-pointer px-[16px] py-[8px]',
                customButtonClass,
            )}
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
