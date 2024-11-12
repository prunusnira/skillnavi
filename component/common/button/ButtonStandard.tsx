import { cn } from '@/module/util/cn';

interface Props {
    iconUrl?: string;
    text: string;
    bgColor?: string;
    onClick?: () => void;
}

const ButtonStandard = ({ iconUrl, text, bgColor, onClick }: Props) => {
    return (
        <section
            className={cn(
                'flex-center bg-blue-950 px-4 py-2 rounded-xl cursor-pointer',
            )}
            style={{ backgroundColor: bgColor }}
            onClick={onClick}
        >
            {iconUrl && (
                <img
                    alt="btn icon"
                    src={iconUrl}
                />
            )}
            <div>{text}</div>
        </section>
    );
};

export default ButtonStandard;
