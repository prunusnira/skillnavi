'use client';

import { TowerList } from '@/feature/tower/data/Tower';
import { useRouter } from '@/i18n/routing';
import { LINK_TOWER_DETAIL } from '@/url/url';
import { getTowerType } from '@/feature/tower/data/getTowerType';

interface Props {
    item: TowerList;
}

export const TowerListItem = ({ item }: Props) => {
    const router = useRouter();

    return (
        <div
            className={
                'relative h-20 w-52 cursor-pointer rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-500'
            }
            onClick={() => router.push(`${LINK_TOWER_DETAIL}?id=${item.id}`)}
        >
            <span
                className={
                    'absolute left-3 top-3 text-xs font-medium text-slate-500 dark:text-slate-400'
                }
            >
                {getTowerType(item.game)}
            </span>
            <span className={'absolute bottom-3 right-3 text-sm font-semibold'}>
                {item.display}
            </span>
        </div>
    );
};
