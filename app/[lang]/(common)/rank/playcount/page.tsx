import Card from '@/component/common/card/Card';
import { getTranslations } from 'next-intl/server';
import { getPlaycountRank } from '@/module/api/rank/getPlaycountRank';
import { getLatestVersion } from '@/module/api/env/getGameVersions';
import PlayCountRankType from '@/component/rank/playcount/PlayCountRankType';
import PlayCountRankUser from '@/component/rank/playcount/PlayCountRankUser';
import { MUSICLIST_SIZE } from '@/data/env/constant';
import Pager from '@/component/common/pager/Pager';

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
