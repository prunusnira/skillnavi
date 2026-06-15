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

export const ButtonRounded = ({
    icon,
    text,
    onClick,
    fixedWidth,
    isSelected,
    disabled,
    customDisabledClass,
    customSelectedClass,
    customClass,
}: Props) => {
    const color = useMemo(() => {
        if (disabled) {
            return (
                customDisabledClass ||
                'border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500'
            );
        }
        if (isSelected) {
            return (
                customSelectedClass ||
                'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500'
            );
        }
        return (
            customClass ||
            'border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300'
        );
    }, [
        isSelected,
        disabled,
    ]);

    return (
        <button
            className={clsx(
                'flex-center min-h-9 rounded-xl border px-3 py-1.5 text-sm font-medium transition-colors',
                disabled && 'cursor-not-allowed',
                color,
            )}
            onClick={onClick}
            style={{
                width: fixedWidth,
            }}
            disabled={disabled}
        >
            {icon}
            {text}
        </button>
    );
};
