import { ReactNode, useMemo } from 'react';
import { cn } from '@/lib/cn';

interface Props {
    icon?: ReactNode;
    text: string;
    onClick?: () => void;
    fixedWidth?: number;
    isSelected?: boolean;
    disabled?: boolean;
}

const ButtonRounded = ({
    icon,
    text,
    onClick,
    fixedWidth,
    isSelected,
    disabled,
}: Props) => {
    const color = useMemo(() => {
        if (isSelected) {
            return 'bg-white text-black';
        }
        return '';
    }, [isSelected]);

    return (
        <button
            className={cn('flex-center border rounded-2xl px-2 py-1', color)}
            onClick={onClick}
            style={{
                width: fixedWidth,
            }}
            disabled={disabled}
        >
            {icon}
            <div className={cn('text-sm')}>{text}</div>
        </button>
    );
};

export default ButtonRounded;
