import Card from '@/common/card/Card';
import Pager from '@/common/pager/Pager';
import { getTranslations } from 'next-intl/server';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import { getMusicList } from '@/feature/music/api/getMusicList';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { MusicListItem } from '@/feature/music/component/list/MusicListItem';
import { PatternListMenu } from '@/feature/music/component/list/menu/PatternListMenu';

const PageMusicList = async (
    props: {
        searchParams: Promise<{
            musicVersion: string;
            gameVersion: string;
            order: string;
            page: string;
        }>;
    }
) => {
    const searchParams = await props.searchParams;
    const latest = await getLatestVersion();
    const {
        musicVersion = latest,
        gameVersion = latest,
        order,
        page = 1,
    } = searchParams;
    const data = await getMusicList({
        musicVersion: Number(musicVersion),
        gameVersion: Number(gameVersion),
        order,
        page: Number(page),
    });

    const { count, music } = data;
    const pages =
        Math.floor(count / MUSICLIST_SIZE) + (count % 30 === 0 ? 0 : 1);
    const t = await getTranslations('pattern');

    return (
        <Card title={t('title')}>
            <section className={'flex-col-center gap-[20px] w-full'}>
                <PatternListMenu />

                {music.map((s) => (
                    <MusicListItem
                        key={s.mid}
                        s={s}
                        version={gameVersion}
                    />
                ))}

                <Pager
                    page={Number(page)}
                    allpage={pages}
                />
            </section>
        </Card>
    );
};

export default PageMusicList;
