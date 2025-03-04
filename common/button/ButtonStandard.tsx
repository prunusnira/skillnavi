import { cn } from '@/lib/cn';
import Image from 'next/image';

interface Props {
    iconUrl?: string;
    text: string;
    bgColor?: string;
    onClick?: () => void;
    size?: number;
}

const ButtonStandard = ({ iconUrl, text, bgColor, onClick, size }: Props) => {
    return (
        <section
            className={cn(
                'flex-center bg-blue-950 px-4 py-2 rounded-xl cursor-pointer',
            )}
            style={{ backgroundColor: bgColor }}
            onClick={onClick}
        >
            {iconUrl && (
                <Image
                    unoptimized={true}
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

export default ButtonStandard;
