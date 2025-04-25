import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { ResetDecision } from '@/feature/profile/component/reset/ResetDecision';

const PageProfileReset = async () => {
    const t = await getTranslations('reset');
    return (
        <Card title={t('title')}>
            <section className={'flex-col-center gap-[20px] py-[50px] text-sm'}>
                <div className={'flex-col-center gap-[8px]'}>
                    <div className={'font-bold !text-red-500'}>
                        {t('description.desc1')}
                    </div>
                    <div>{t('description.desc2')}</div>
                    <div>{t('description.desc3')}</div>
                </div>
                <ResetDecision />
            </section>
        </Card>
    );
};

export default PageProfileReset;
