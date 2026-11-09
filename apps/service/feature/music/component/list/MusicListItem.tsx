import { cn } from '@/lib/cn';
import AlbumArt from '@/common/albumart/AlbumArt';
import MusicRemoved from '@/feature/music/component/remove/MusicRemoved';
import MusicDiffTable from '@/feature/music/component/diff/MusicDiffTable';
import { MusicListPageData } from '@/feature/music/data/MusicListPageData';
import { Link } from '@/i18n/routing';
import { LINK_MUSIC_INFO } from '@/url/url';

interface Props {
    data: MusicListPageData;
    version: string | number;
    uid?: number;
}

export const MusicListItem = ({ data, version, uid }: Props) => {
    const musicInfoHref = LINK_MUSIC_INFO({
        mid: data.mid,
        version: Number(version),
        uid,
    });

    return (
        <section
            className={cn(
                'flex w-full flex-col gap-3 py-4 md:flex-row md:items-center md:justify-center md:gap-5 md:py-5',
            )}
            key={data.mid}
        >
            {/* 자켓 & 제목 */}
            <section
                className={cn(
                    'flex w-full min-w-0 items-center gap-3 md:w-[150px] md:shrink-0 md:flex-col md:gap-0',
                )}
            >
                <Link
                    aria-label={data.name}
                    className="block shrink-0"
                    href={musicInfoHref}
                >
                    <AlbumArt
                        mid={data.mid}
                        className={'rounded-xl'}
                        size={96}
                    />
                </Link>
                <div className="min-w-0 flex-1 md:max-w-[100px] md:flex-none md:text-center">
                    <Link
                        className="block text-sm font-semibold line-clamp-2 break-words hover:underline md:break-all"
                        href={musicInfoHref}
                    >
                        {data.name}
                    </Link>
                    {data.composer && (
                        <div className="text-xs text-slate-600 line-clamp-2 break-words dark:text-slate-300 md:break-all">
                            {data.composer}
                        </div>
                    )}
                    <MusicRemoved version={data.remove} />
                </div>
            </section>

            {/* 난이도 테이블 */}
            <MusicDiffTable
                pattern={data.patterns}
                skill={data.skills}
                mid={data.mid}
                version={Number(version)}
                uid={uid}
            />
        </section>
    );
};
