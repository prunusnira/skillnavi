import { ButtonRounded } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import Card from '@/common/card/Card';

interface Props {
    changeHowtoOpenState: (howto: number) => void;
}

export const HowtoButtons = ({ changeHowtoOpenState }: Props) => {
    const t = useTranslations('main.howto');

    return (
        <Card title="HOW TO UPDATE">
            <ButtonRounded
                onClick={() => changeHowtoOpenState(0)}
                text={t('buttonForPC')}
            />
            <ButtonRounded
                onClick={() => changeHowtoOpenState(1)}
                text={t('buttonForMOChrome')}
            />
            <ButtonRounded
                onClick={() => changeHowtoOpenState(2)}
                text={t('buttonForMOSafari')}
            />
        </Card>
    );
};
