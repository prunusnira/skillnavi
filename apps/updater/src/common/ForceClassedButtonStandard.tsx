import { ButtonRounded, ButtonStandard } from '@skillnavi/ui';
import { clsx } from 'clsx';

interface StandardProps {
    onClick: () => void;
    disabled?: boolean;
    text: string;
}

export const ForceClassedButtonStandard = ({
    onClick,
    disabled,
    text,
}: StandardProps) => {
    return (
        <ButtonStandard
            text={text}
            onClick={onClick}
            disabled={disabled}
            customTextClass={'!px-[16px] !py-[8px] !bg-blue-400 !rounded-xl'}
        />
    );
};

interface RoundedProps {
    text: string;
    isSelected: boolean;
    onClick: () => void;
    customClass?: string;
}

export const ForceClassedButtonRounded = ({
    onClick,
    text,
    isSelected,
    customClass,
}: RoundedProps) => {
    return (
        <ButtonRounded
            text={text}
            isSelected={isSelected}
            onClick={onClick}
            customClass={clsx(customClass, '!px-[8px] !py-[4px]')}
        />
    );
};
