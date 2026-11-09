'use client';

import UserLinkIcon from '@/common/table/user/UserLinkIcon';
import { useTranslations } from 'next-intl';
import RankPosition from '@/common/rank/RankPosition';
import { GameTypeAll } from '@/common/game/data/GameType';
import { cn } from '@/lib/cn';

interface Props {
    rank: number;
    id: number;
    name: string;
    titletower: string;
    openinfo: boolean;
    gcount: number;
    dcount: number;
    allcount: number;
    selectedType: GameTypeAll;
}

const PlayCountRankUser = ({
    rank,
    id,
    name,
    titletower,
    openinfo,
    gcount,
    dcount,
    allcount,
    selectedType,
}: Props) => {
    const t = useTranslations('common');

    const metrics = [
        { key: 'gf', label: 'GF', value: gcount },
        { key: 'dm', label: 'DM', value: dcount },
        { key: 'all', label: t('all'), value: allcount },
    ] as const;

    return (
        <article className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-2xl border border-slate-200/80 bg-white/80 p-3 shadow-sm transition hover:border-indigo-200 hover:bg-white dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-indigo-900 dark:hover:bg-slate-900 sm:grid-cols-[auto_minmax(0,1fr)_repeat(3,minmax(5rem,0.72fr))] sm:gap-4 sm:px-4">
            <RankPosition value={rank} />

            <div className="min-w-0">
                <UserLinkIcon
                    user={{
                        id,
                        name,
                        titletower,
                        openinfo,
                    }}
                    privateNameLabel={t('namePrivate')}
                    emptyNameLabel={t('nameMissing')}
                />
            </div>

            <div className="col-span-2 grid w-full grid-cols-3 gap-2 sm:contents">
                {metrics.map((metric) => (
                    <div
                        key={metric.key}
                        className={cn(
                            'flex min-w-0 flex-col items-center justify-center rounded-xl border px-2 py-2 text-center sm:py-2.5',
                            selectedType === metric.key
                                ? 'border-indigo-200 bg-indigo-50 text-indigo-950 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-100'
                                : 'border-slate-100 bg-slate-50/80 text-slate-600 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300',
                        )}
                    >
                        <span className="text-[10px] font-bold tracking-wide text-slate-500 uppercase dark:text-slate-400 sm:text-xs">
                            {metric.label}
                        </span>
                        <span className="text-base font-extrabold tabular-nums sm:text-lg">
                            {metric.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </article>
    );
};

export default PlayCountRankUser;
