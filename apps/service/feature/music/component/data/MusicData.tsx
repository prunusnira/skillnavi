import { cn } from '@/lib/cn';
import AlbumArt from '@/common/albumart/AlbumArt';
import VersionDisplay from '@/feature/version/VersionDisplay';
import { getMusicInfo } from '@/feature/music/api/getMusicInfo';

interface Props {
    mid: number;
}

// SSR 곡 정보
const MusicData = async ({ mid }: Props) => {
    const music = await getMusicInfo({ mid });

    return (
        <section className={cn('flex w-full max-w-3xl')}>
            {/* 곡 정보 */}
            <AlbumArt
                mid={mid}
                className={'rounded-2xl'}
                size={96}
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
    );
};

export default MusicData;
