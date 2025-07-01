import { cn } from '@/lib/cn';
import AlbumArt from '@/common/albumart/AlbumArt';
import MusicRemoved from '@/feature/music/component/remove/MusicRemoved';
import MusicDiffTable from '@/feature/music/component/diff/MusicDiffTable';
import { MusicListPageData } from '@/feature/music/data/MusicListPageData';

interface Props {
    data: MusicListPageData;
    version: string | number;
}

export const MusicListItem = ({ data, version }: Props) => {
    return (
        <section
            className={cn('flex w-full justify-center py-5')}
            key={data.mid}
        >
            {/* 자켓 & 제목 */}
            <section className={cn('flex-col-center w-[150px]')}>
                <div>
                    <AlbumArt
                        mid={data.mid}
                        className={'rounded-xl'}
                        size={96}
                    />
                </div>
                <div
                    className={
                        'text-sm font-semibold max-w-[100px] break-all line-clamp-2'
                    }
                >
                    {data.name}
                </div>
                <MusicRemoved version={data.remove} />
            </section>

            {/* 난이도 테이블 */}
            <MusicDiffTable
                pattern={data.patterns}
                skill={data.skills}
                mid={data.mid}
                version={Number(version)}
            />
        </section>
    );
};
