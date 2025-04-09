import Card from '@/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { getPlaycountRank } from '@/feature/rank/playcount/api/getPlaycountRank';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import PlayCountRankType from '@/feature/rank/playcount/component/PlayCountRankType';
import PlayCountRankUser from '@/feature/rank/playcount/component/PlayCountRankUser';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import Pager from '@/common/pager/Pager';

const PagePlaycount = async ({
                                 searchParams,
                             }: {
    searchParams: { page: number; version: number };
}) => {
    const { page, version } = searchParams;
    const latest = await getLatestVersion();
    const curpage = page ?? 1;
    const ranking = await getPlaycountRank({
        page: curpage,
        version: version ?? latest,
    });
    const { pages, users } = ranking;
    const t = await getTranslations('skill.countrank');
    return (
        <Card title={t('title')}>
            <PlayCountRankType />

            <section className={'flex flex-col gap-[5px] w-full'}>
                {users.map((user, index) => (
                    <PlayCountRankUser
                        key={user.id}
                        {...user}
                        rank={(curpage - 1) * MUSICLIST_SIZE + index + 1}
                    />
                ))}
            </section>

            <Pager
                page={page}
                allpage={pages}
            />
        </Card>
    );
};

export default PagePlaycount;
