import Card from '@/common/card/Card';
import Pager from '@/common/pager/Pager';
import { getTranslations } from 'next-intl/server';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import { getMusicList } from '@/feature/music/api/getMusicList';
import { getLatestVersion } from '@/feature/env/api/getGameVersions';
import { MusicListItem } from '@/feature/music/component/list/MusicListItem';

const PageMusicList = async ({
    searchParams,
}: {
    searchParams: {
        version: string;
        order: string;
        page: string;
    };
}) => {
    const {
        version = await getLatestVersion(),
        order,
        page = 1,
    } = searchParams;
    const data = await getMusicList({
        version: Number(version),
        order,
        page: Number(page),
    });

    const { count, music } = data;
    const pages =
        Math.floor(count / MUSICLIST_SIZE) + (count % 30 === 0 ? 0 : 1);
    const t = await getTranslations('pattern');

    return (
        <Card title={t('title')}>
            {music.map((s) => (
                <MusicListItem
                    key={s.mid}
                    s={s}
                    version={version}
                />
            ))}

            <Pager
                page={Number(page)}
                allpage={pages}
            />
        </Card>
    );
};

export default PageMusicList;
