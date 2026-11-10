import { TowerList } from '@/feature/tower/data/Tower';
import { Link } from '@/i18n/routing';
import { LINK_TOWER_DETAIL } from '@/url/url';
import { getTowerType } from '@/feature/tower/data/getTowerType';

interface Props {
    item: TowerList;
}

export const TowerListItem = ({ item }: Props) => {
    return (
        <Link
            href={`${LINK_TOWER_DETAIL}?id=${item.id}`}
            className="group flex min-h-28 min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-lime-400/70 hover:bg-lime-50/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-lime-300/50 dark:hover:bg-slate-700"
        >
            <span className="min-w-0">
                <span className="mb-2 inline-flex max-w-full truncate rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold tracking-wide text-slate-500 uppercase dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">
                    {getTowerType(item.game)}
                </span>
                <span className="block line-clamp-2 break-words text-base font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-200">
                    {item.display}
                </span>
            </span>
            <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-lg text-slate-500 transition-all group-hover:border-lime-400 group-hover:bg-lime-300 group-hover:text-slate-950 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:group-hover:border-lime-300 dark:group-hover:bg-lime-300 dark:group-hover:text-slate-950"
            >
                →
            </span>
        </Link>
    );
};
