'use client';

import { TowerList } from '@/feature/tower/data/Tower';
import { useRouter } from '@/i18n/routing';
import { LINK_TOWER_DETAIL } from '@/url/url';

interface Props {
    item: TowerList;
}

export const TowerListItem = ({item}: Props) => {
    const router = useRouter();

    const getType = (type: string) => {
        switch (type) {
            case 'gf': return 'GuitarFreaks';
            case 'dm': return 'DrumMania';
            case 'sp': return 'Special';
        }
    }

    return (
        <div
            className={'w-[200px] h-[75px] relative border border-solid border-black dark:border-white'}
            onClick={() => router.push(`${LINK_TOWER_DETAIL}?id=${item.id}`)}
        >
            <span className={'absolute left-[4px] top-[4px] text-sm'}>{getType(item.game)}</span>
            <span className={'absolute right-[4px] bottom-[4px] text-sm font-bold'}>{item.display}</span>
        </div>
    )
}