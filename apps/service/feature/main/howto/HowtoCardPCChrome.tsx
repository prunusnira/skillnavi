import Card from '@/common/card/Card';
import { useTranslations } from 'next-intl';
import { IMG } from '@/url/url';

export const HowtoCardPCChrome = () => {
    const t = useTranslations('main.howto');

    return (
        <section className={'flex flex-col md:flex-row w-full'}>
            {/* PC 사용법 1 */}
            <Card
                title={t('buttonForPC')}
                option={{
                    itemStartPosition: 'start',
                }}
            >
                <section className={'px-2 py-1'}>
                    <div className="py-[8px]">1. {t('pc_desc.step1')}</div>
                    <div className="py-[8px]">2. {t('pc_desc.step2')}</div>
                    <img
                        alt={'pchowto1'}
                        src={`${IMG}/howto/pchowto1.png`}
                    />
                    <div className="py-[8px]">3. {t('pc_desc.step3')}</div>
                    <img
                        alt={'pchowto1'}
                        src={`${IMG}/howto/pchowto2.png`}
                    />
                </section>
            </Card>

            {/* PC 사용법 2 */}
            <Card
                title={t('buttonForPC')}
                option={{
                    itemStartPosition: 'start',
                }}
            >
                <section className={'px-2 py-1'}>
                    <div className="py-[8px]">4. {t('pc_desc.step4')}</div>
                    <img
                        alt={'pchowto1'}
                        src={`${IMG}/howto/pchowto3.png`}
                    />
                    <div className="py-[8px]">5. {t('pc_desc.step5')}</div>
                    <div className="py-[8px]">6. {t('pc_desc.step6')}</div>
                    <img
                        alt={'pchowto1'}
                        src={`${IMG}/howto/pchowto4.png`}
                    />
                </section>
            </Card>
        </section>
    );
};
