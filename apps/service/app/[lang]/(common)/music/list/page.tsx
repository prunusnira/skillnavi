import Card from '@/common/card/Card';
import Pager from '@/common/pager/Pager';
import { getTranslations } from 'next-intl/server';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import { getMusicList } from '@/feature/music/api/getMusicList';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { MusicListItem } from '@/feature/music/component/list/MusicListItem';
import { PatternListMenu } from '@/feature/music/component/list/menu/PatternListMenu';
import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';

const PageMusicList = async (props: {
    searchParams: Promise<{
        musicVersion?: string;
        gameVersion?: string;
        difficulty?: string;
        order?: string;
        page?: string;
    }>;
}) => {
    const session = await getServerSession();
    const profile = await getProfileSession(session);
    const searchParams = await props.searchParams;
    const latest = await getLatestVersion();
    const {
        musicVersion = latest,
        gameVersion = latest,
        difficulty,
        order,
        page = 1,
    } = searchParams;
    const data = await getMusicList({
        userid: profile?.id,
        musicVersion: Number(musicVersion),
        gameVersion: Number(gameVersion),
        difficulty: difficulty ? Number(difficulty) : undefined,
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

                {music.map((musicItem) => (
                    <MusicListItem
                        key={musicItem.mid}
                        data={musicItem}
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
