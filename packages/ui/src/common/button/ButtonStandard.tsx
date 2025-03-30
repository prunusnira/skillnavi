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
            className={
                'flex-center bg-blue-400 px-[16px] py-[8px] rounded-xl cursor-pointer'
            }
            style={{ backgroundColor: bgColor }}
            onClick={onClick}
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
