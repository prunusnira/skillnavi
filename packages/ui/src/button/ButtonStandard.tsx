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
            return customSelectedClass || 'bg-indigo-600 text-white';
        }
        if (disabled) {
            return (
                customDisabledClass ||
                'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500'
            );
        }
        return (
            customTextClass ||
            'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400'
        );
    }, [
        disabled,
        isSelected,
    ]);

    return (
        <section
            className={clsx(
                color,
                'flex-center min-h-10 rounded-xl px-4 py-2 font-medium shadow-sm transition-colors',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
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
