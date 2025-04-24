import { cn } from '@/lib/cn';
import AlbumArt from '@/common/albumart/AlbumArt';
import MusicRemoved from '@/feature/music/component/remove/MusicRemoved';
import MusicDiffTable from '@/feature/music/component/diff/MusicDiffTable';
import { MusicListPageData } from '@/feature/music/data/MusicListPageData';

interface Props {
    s: MusicListPageData;
    version: string | number;
}

export const MusicListItem = ({ s, version }: Props) => {
    return (
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
                <div
                    className={
                        'text-sm font-semibold max-w-[100px] break-all line-clamp-2'
                    }
                >
                    {s.name}
                </div>
                <MusicRemoved version={s.remove} />
            </section>

            {/* 난이도 테이블 */}
            <MusicDiffTable
                pattern={s.patterns}
                mid={s.mid}
                version={Number(version)}
            />
        </section>
    );
};
