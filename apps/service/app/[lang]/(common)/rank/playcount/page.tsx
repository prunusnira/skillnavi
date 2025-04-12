import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import PlayCountRankType from '@/feature/rank/playcount/component/PlayCountRankType';
import { PlayCountRankList } from '@/feature/rank/playcount/component/PlayCountRankList';

const PagePlaycount = async () => {
    const t = await getTranslations('skill.countrank');
    return (
        <Card title={t('title')}>
            <PlayCountRankType />
            <PlayCountRankList />
        </Card>
    );
};

export default PagePlaycount;
