import { ReactNode, useMemo } from 'react';
import { clsx } from 'clsx';

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
        if (disabled) {
            return 'bg-gray-500, text-white';
        }
        if (isSelected) {
            return 'bg-black text-white';
        }
        return 'bg-white text-black';
    }, [isSelected]);

    return (
        <button
            className={clsx('flex-center border rounded-2xl px-2 py-1', color)}
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

export default ButtonRounded;
