'use client';

import { GameType } from '@/common/game/data/GameType';
import { useRouter } from '@/i18n/routing';
import { LINK_SNAPSHOT_DETAIL } from '@/url/url';
import { cn } from '@/lib/cn';

interface Props {
    uid: number;
    type: GameType;
    date: string;
}

export const SnapshotListItem = ({ uid, type, date }: Props) => {
    const router = useRouter();
    return (
        <button
            type="button"
            className={cn(
                'flex min-h-11 w-full items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400',
                'border-slate-200 bg-white text-slate-700 hover:border-lime-400/70 hover:bg-lime-50',
                'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-lime-400/60 dark:hover:bg-slate-800',
            )}
            onClick={() => {
                router.push(LINK_SNAPSHOT_DETAIL(uid, type, date));
            }}
        >
            {date}
        </button>
    );
};
