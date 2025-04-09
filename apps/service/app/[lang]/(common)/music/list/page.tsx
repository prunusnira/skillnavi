import Card from '@/common/card/Card';
import { cn } from '@/lib/cn';
import MusicRemoved from '@/feature/music/component/remove/MusicRemoved';
import AlbumArt from '@/common/albumart/AlbumArt';
import MusicDiffTable from '@/feature/music/component/diff/MusicDiffTable';
import Pager from '@/common/pager/Pager';
import { getTranslations } from 'next-intl/server';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import { getMusicList } from '@/feature/music/api/getMusicList';

const PageMusicList = async ({
                                 searchParams,
                             }: {
    searchParams: {
        version: number;
        order: string;
        page: number;
    };
}) => {
    const { version, order, page } = searchParams;
    const data = await getMusicList({ version, order, page });

    const { count, music } = data;
    const pages =
        Math.floor(count / MUSICLIST_SIZE) + (count % 30 === 0 ? 0 : 1);
    const t = await getTranslations('music.list');

    return (
        <Card title={t('title')}>
            {music.map((s) => (
                <section
                    className={cn('flex w-full justify-center py-5')}
                    key={s.mid}
                >
                    {/* 자켓 & 제목 */}
                    <section className={cn('flex-col-center w-[150px]')}>
                        <div>
                            <AlbumArt
                                mid={s.mid}
                                className={'rounded-xl'}
                                size={96}
                            />
                        </div>
                        <div>{s.name}</div>
                        <MusicRemoved version={s.remove} />
                    </section>

                    {/* 난이도 테이블 */}
                    <MusicDiffTable pattern={s.patterns} />
                </section>
            ))}

            <Pager
                page={page}
                allpage={pages}
            />
        </Card>
    );
};

export default PageMusicList;
