import Card from '@/common/card/Card';
import { useTranslations } from 'next-intl';
import { IMG } from '@/url/url';

export const HowtoCardAndroidChrome = () => {
    const t = useTranslations('main.howto');

    return (
        <section className={'flex flex-col md:flex-row w-full'}>
            {/* PC 사용법 1 */}
            <Card
                title={t('buttonForMOChrome')}
                option={{
                    itemStartPosition: 'start',
                }}
            >
                <section className={'px-2 py-1'}>
                    <div className="py-[8px]">1. {t('chrome_desc.step1')}</div>
                    <div className="py-[8px]">2. {t('chrome_desc.step2')}</div>
                    <img
                        alt={'howto1'}
                        src={`${IMG}/howto/chromehowto1.png`}
                    />
                </section>
            </Card>

            {/* PC 사용법 2 */}
            <Card
                title={t('buttonForMOChrome')}
                option={{
                    itemStartPosition: 'start',
                }}
            >
                <section className={'px-2 py-1'}>
                    <div className="py-[8px]">3. {t('chrome_desc.step3')}</div>
                    <img
                        alt={'howto2'}
                        src={`${IMG}/howto/chromehowto2.png`}
                    />
                </section>
            </Card>
        </section>
    );
};
