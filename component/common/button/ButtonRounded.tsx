import { ReactNode } from 'react';
import { cn } from '@/module/util/cn';

interface Props {
    icon?: ReactNode;
    text: string;
    onClick?: () => void;
    fixedWidth?: number;
}

const ButtonRounded = ({ icon, text, onClick, fixedWidth }: Props) => {
    return (
        <button
            className={cn('flex-center border rounded-2xl px-2 py-1')}
            onClick={onClick}
            style={{
                width: fixedWidth,
            }}
        >
            {icon}
            <div className={cn('text-sm')}>{text}</div>
        </button>
    );
};

export default ButtonRounded;
