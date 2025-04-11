'use client';

import { TowerList } from '@/feature/tower/data/Tower';
import { useRouter } from '@/i18n/routing';
import { LINK_TOWER_DETAIL } from '@/url/url';
import { getTowerType } from '@/feature/tower/data/getTowerType';

interface Props {
    item: TowerList;
}

export const TowerListItem = ({item}: Props) => {
    const router = useRouter();

    return (
        <div
            className={'w-[200px] h-[75px] relative border border-solid border-black dark:border-white cursor-pointer'}
            onClick={() => router.push(`${LINK_TOWER_DETAIL}?id=${item.id}`)}
        >
            <span className={'absolute left-[4px] top-[4px] text-sm'}>{getTowerType(item.game)}</span>
            <span className={'absolute right-[4px] bottom-[4px] text-sm font-bold'}>{item.display}</span>
        </div>
    )
}