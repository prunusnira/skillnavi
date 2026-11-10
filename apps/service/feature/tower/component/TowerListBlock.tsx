import { TowerList } from '@/feature/tower/data/Tower';
import { TowerListItem } from '@/feature/tower/component/TowerListItem';
import { getTowerType } from '@/feature/tower/data/getTowerType';

interface Props {
    type: string;
    itemList: TowerList[];
}

export const TowerListBlock = ({ type, itemList }: Props) => {
    return (
        <section className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <header className="flex items-center justify-between gap-4 border-b border-slate-200/80 bg-slate-50/70 px-4 py-4 dark:border-slate-700 dark:bg-[#131a2a] sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-300 text-sm font-black text-slate-950 shadow-sm shadow-lime-300/20 dark:bg-lime-300 dark:text-slate-950">
                        {type.toUpperCase()}
                    </span>
                    <h2 className="truncate text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-lg">
                        {getTowerType(type)}
                    </h2>
                </div>
                <span className="inline-flex min-w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold tabular-nums text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    {itemList.length}
                </span>
            </header>
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
                {itemList.map((item) => (
                    <TowerListItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
};
