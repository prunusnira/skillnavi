interface Props {
    iconUrl?: string;
    text: string;
    bgColor?: string;
    onClick?: () => void;
    size?: number;
    disabled?: boolean;
}

const ButtonStandard = ({ iconUrl, text, bgColor, onClick, size, disabled }: Props) => {
    return (
        <section
            className={
                'flex-center bg-blue-500 text-white px-[16px] py-[8px] rounded-xl cursor-pointer'
            }
            style={{ backgroundColor: disabled ? 'lightblue' : bgColor }}
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

export default ButtonStandard;
