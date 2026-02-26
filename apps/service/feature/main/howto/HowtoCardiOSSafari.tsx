import Card from '@/common/card/Card';
import { useTranslations } from 'next-intl';
import { IMG } from '@/url/url';

export const HowtoCardiOSSafari = () => {
    const t = useTranslations('main.howto');

    return (
        <section className={'flex flex-col md:flex-row w-full'}>
            {/* PC 사용법 1 */}
            <Card
                title={t('buttonForMOSafari')}
                option={{
                    itemStartPosition: 'start',
                }}
            >
                <section className={'px-2 py-1'}>
                    <div className="py-[8px]">1. {t('safari_desc.step1')}</div>
                    <div className="py-[8px]">2. {t('safari_desc.step2')}</div>
                    <img
                        alt={'safari1'}
                        src={`${IMG}/howto/mosafari1.png`}
                    />
                    <div className="py-[8px]">3. {t('safari_desc.step3')}</div>
                    <img
                        alt={'how to image 1'}
                        src={`${IMG}/howto/mosafari2.png`}
                    />
                    <div className="py-[8px]">4. {t('safari_desc.step4')}</div>
                    <img
                        alt={'how to image 1'}
                        src={`${IMG}/howto/mosafari3.png`}
                    />
                </section>
            </Card>

            {/* PC 사용법 2 */}
            <Card
                title={t('buttonForMOSafari')}
                option={{
                    itemStartPosition: 'start',
                }}
            >
                <section className={'px-2 py-1'}>
                    <div className="py-[8px]">5. {t('safari_desc.step5')}</div>
                    <img
                        alt={'how to image 1'}
                        src={`${IMG}/howto/mosafari4.png`}
                    />
                    <div className="py-[8px]">6. {t('safari_desc.step6')}</div>
                    <div className="py-[8px]">7. {t('safari_desc.step7')}</div>
                    <img
                        alt={'how to image 1'}
                        src={`${IMG}/howto/mosafari5.png`}
                    />
                </section>
            </Card>
        </section>
    );
};
