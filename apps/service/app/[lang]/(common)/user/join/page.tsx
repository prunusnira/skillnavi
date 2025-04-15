import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { UserJoinButton } from '@/feature/user/join/component/UserJoin.button';

const PageUserJoin = async () => {
    const t = await getTranslations('user.join');


    return (
        <Card title={t('title')}>
            <section className={'flex flex-col px-[16px] py-[8px] gap-[12px]'}>
                <div className={'text-md font-normal'}>
                    {t('desc')}
                </div>
                <UserJoinButton />
            </section>
        </Card>
    );
};

export default PageUserJoin;