'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getPlaycountRank } from '@/feature/rank/playcount/api/getPlaycountRank';
import { GameTypeAll, isGameTypeAll } from '@/common/game/data/GameType';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import PlayCountRankUser from '@/feature/rank/playcount/component/PlayCountRankUser';
import Pager from '@/common/pager/Pager';
import { useAtomValue } from 'jotai';
import { atomGameVersionLatest } from '@/common/game/data/atomGameVersion';
import { useTranslations } from 'next-intl';

export const PlayCountRankList = () => {
    const searchParams = useSearchParams();
    const latest = useAtomValue(atomGameVersionLatest);
    const requestedPage = Number(searchParams.get('page') || '1');
    const page =
        Number.isInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1;
    const requestedType = searchParams.get('type');
    const gtype: GameTypeAll = isGameTypeAll(requestedType)
        ? requestedType
        : 'gf';
    const version = Number(searchParams.get('version') || latest?.id || 0);
    const t = useTranslations('common');

    const {
        data: ranking,
        isPending,
        isError,
    } = useQuery({
        queryKey: [
            'playcount',
            'rank',
            page,
            gtype,
            version,
        ],
        queryFn: () =>
            getPlaycountRank({
                page,
                gtype,
                version,
            }),
        enabled: isGameTypeAll(gtype) && version > 0,
    });

    return (
        <>
            <section className="w-full space-y-3">
                <div className="hidden grid-cols-[2.5rem_minmax(0,1fr)_repeat(3,minmax(5rem,0.72fr))] items-center gap-4 px-4 text-[11px] font-bold tracking-wide text-slate-400 uppercase sm:grid">
                    <span>{t('rank')}</span>
                    <span>{t('player')}</span>
                    <span className="text-center">GF</span>
                    <span className="text-center">DM</span>
                    <span className="text-center">{t('all')}</span>
                </div>

                {isPending && (
                    <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        {t('loadingRank')}
                    </div>
                )}

                {!isPending && (isError || !ranking?.users.length) && (
                    <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        {t('emptyRank')}
                    </div>
                )}

                {ranking?.users.map((user, index) => (
                    <PlayCountRankUser
                        key={user.id}
                        {...user}
                        selectedType={gtype}
                        rank={(page - 1) * MUSICLIST_SIZE + index + 1}
                    />
                ))}
            </section>

            <Pager
                page={page}
                allpage={ranking?.pages || 1}
            />
        </>
    );
};
