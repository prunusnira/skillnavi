import { getTranslations } from 'next-intl/server';
import Card from '@/component/common/card/Card';
import { cn } from '@/module/util/cn';
import AlbumArt from '@/component/common/albumart/AlbumArt';
import { getMusicInfo } from '@/module/api/music/getMusicInfo';
import VersionDisplay from '@/component/version/VersionDisplay';
import MusicRecord from '@/component/music/MusicRecord';

const PageMusic = async ({
    searchParams,
}: {
    searchParams: {
        mid: number;
    };
}) => {
    const t = await getTranslations('music.detail');
    const { mid } = searchParams;

    const music = await getMusicInfo({ mid });

    return (
        <Card title={t('title')}>
            <section className={cn('flex-col-center w-full max-w-3xl')}>
                {/* 음악 데이터 */}
                <section className={cn('flex w-full')}>
                    {/* 곡 정보 */}
                    <AlbumArt
                        mid={mid}
                        className={cn('w-24 h-24 rounded-2xl')}
                    />
                    <div className={cn('flex flex-col justify-center pl-2.5')}>
                        <div className={cn('font-bold text-xl md:text-2xl')}>
                            {music.name}
                        </div>
                        <div>{music.composer}</div>
                        <VersionDisplay
                            version={music.version}
                            type={'full'}
                        />
                    </div>
                </section>

                {/* 기록 정보 */}
                <MusicRecord />
            </section>
        </Card>
    );
};

export default PageMusic;
