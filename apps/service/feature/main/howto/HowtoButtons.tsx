import { ButtonRounded } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import Card from '@/common/card/Card';

interface Props {
    activeHowto: number;
    changeHowtoOpenState: (howto: number) => void;
}

export const HowtoButtons = ({ activeHowto, changeHowtoOpenState }: Props) => {
    const t = useTranslations('main.howto');

    return (
        <Card title="HOW TO UPDATE">
            <div className="flex w-full flex-wrap justify-center gap-2.5">
                <ButtonRounded
                    isSelected={activeHowto === 0}
                    customSelectedClass="border-lime-300 bg-lime-300 text-slate-950 shadow-md shadow-lime-300/20"
                    onClick={() => changeHowtoOpenState(0)}
                    text={t('buttonForPC')}
                />
                <ButtonRounded
                    isSelected={activeHowto === 1}
                    customSelectedClass="border-lime-300 bg-lime-300 text-slate-950 shadow-md shadow-lime-300/20"
                    onClick={() => changeHowtoOpenState(1)}
                    text={t('buttonForMOChrome')}
                />
                <ButtonRounded
                    isSelected={activeHowto === 2}
                    customSelectedClass="border-lime-300 bg-lime-300 text-slate-950 shadow-md shadow-lime-300/20"
                    onClick={() => changeHowtoOpenState(2)}
                    text={t('buttonForMOSafari')}
                />
            </div>
        </Card>
    );
};
