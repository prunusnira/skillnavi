import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/cn';
import { getRecent } from '@/feature/recent/api/getRecent';
import { RecentItem } from '@/feature/recent/component/Recent.item';

const PageRecent = async () => {
    const t = await getTranslations();
    const recent = await getRecent();

    if (!recent) {
        return null;
    }

    return (
        <Card title={t('recent')}>
            <section className={cn('w-full px-2 py-8')}>
                {recent.map((r, i) => (
                    <RecentItem
                        key={`${r.id}_${i}`}
                        user={r}
                    />
                ))}
            </section>
        </Card>
    );
};

export default PageRecent;
