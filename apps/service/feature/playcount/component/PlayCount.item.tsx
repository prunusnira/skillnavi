import { PlayCountResponse } from '@/feature/playcount/component/PlayCount.type';
import { ALBUM } from '@/url/url';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import PatternTag from '@/common/pattern/PatternTag';

interface Props {
    item: PlayCountResponse;
    pos: number;
    type: string;
}

const PlayCountItem = async ({ item, pos, type }: Props) => {
    const t = await getTranslations('user.playcount.table');
    const { id, name, playcount, patterncode } = item;
    return (
        <div
            className={
                'flex h-full w-full min-w-0 flex-col items-center justify-start gap-2 rounded-lg border border-slate-200 bg-white/70 p-3 text-center shadow-sm transition-colors hover:border-lime-400/80 hover:bg-lime-50/50 dark:border-slate-700 dark:bg-slate-950/20 dark:hover:border-lime-400/70 dark:hover:bg-slate-800/50'
            }
        >
            {/*순서*/}
            <div className={'font-semibold text-2xl'}>{pos}</div>

            {/*자켓이미지*/}
            <Image
                unoptimized={true}
                src={`${ALBUM}/${id}.jpg`}
                alt={'jacket'}
                width={90}
                height={90}
            />

            {/*타이틀*/}
            <div className={'w-full min-w-0 line-clamp-1 font-medium'}>
                {name}
            </div>

            {/*패턴*/}
            {type !== 'music' && (
                <div>
                    <PatternTag patternCode={patterncode} />
                </div>
            )}

            {/*플레이카운트*/}
            <div
                className={
                    'font-semibold tabular-nums text-slate-700 dark:text-slate-200'
                }
            >
                {playcount}
                {t('time')}
            </div>
        </div>
    );
};

export default PlayCountItem;
