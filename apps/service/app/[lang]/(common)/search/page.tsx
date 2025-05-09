import Card from '@/common/card/Card';
import { getSearchResult } from '@/feature/search/api/getSearchResult';
import { getTranslations } from 'next-intl/server';
import Pager from '@/common/pager/Pager';
import { MusicListPageData } from '@/feature/music/data/MusicListPageData';
import { MusicListItem } from '@/feature/music/component/list/MusicListItem';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { Recent } from '@/feature/recent/data/Recent';
import { RecentItem } from '@/feature/recent/component/Recent.item';

const PageSearch = async (
    props: {
        searchParams: Promise<{ type: string; value: string; page: number }>;
    }
) => {
    const searchParams = await props.searchParams;
    const t = await getTranslations('search');
    const t2 = await getTranslations('sidemenu.search.type');
    const latest = await getLatestVersion();
    const { type, value, page } = searchParams;

    const searchResult = await getSearchResult(type, value, page);

    if (
        searchResult &&
        'list' in searchResult &&
        'detail' in searchResult.list
    ) {
        return null;
    }

    return (
        <Card title={t('title')}>
            {/* 검색 데이터 */}
            <section className={'flex flex-col gap-[10px] items-center'}>
                <span className={'text-sm font-normal'}>{t('desc.for')}</span>
                <span className={'text-sm font-semibold text-red-500'}>
                    {t('desc.detail')}
                </span>
                <div className={'flex-center gap-[8px]'}>
                    <span className={'text-sm font-medium'}>
                        {t('desc.type')}
                    </span>
                    <span className={'text-md font-bold'}>{t2(type)}</span>
                    <span className={'text-sm font-medium'}>
                        {t('desc.value')}
                    </span>
                    <span className={'text-md font-bold'}>{value}</span>
                </div>
            </section>

            {type === 'music' &&
                (searchResult.list as MusicListPageData[]).map((music) => (
                    <MusicListItem
                        key={music.mid}
                        s={music}
                        version={latest}
                    />
                ))}

            {(type === 'player' || type === 'gfskill' || type === 'dmskill') &&
                (searchResult.list as Recent[]).map((profile) => (
                    <RecentItem
                        key={profile.id}
                        user={profile}
                    />
                ))}

            <Pager
                page={Number(page ?? 1)}
                allpage={searchResult.page}
            />
        </Card>
    );
};

export default PageSearch;
