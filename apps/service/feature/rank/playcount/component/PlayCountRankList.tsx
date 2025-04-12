'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getPlaycountRank } from '@/feature/rank/playcount/api/getPlaycountRank';
import { isGameTypeAll } from '@/common/game/data/GameType';
import { MUSICLIST_SIZE } from '@/feature/env/data/constant';
import PlayCountRankUser from '@/feature/rank/playcount/component/PlayCountRankUser';
import Pager from '@/common/pager/Pager';

export const PlayCountRankList = () => {
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page') || '1');
    const gtype = searchParams.get('type');
    const version = Number(searchParams.get('version'));

    if (!isGameTypeAll(gtype)) {
        return null;
    }

    const { data: ranking } = useQuery({
        queryKey: [
            'playcount',
            'rank',
            page,
            gtype,
            version,
        ],
        queryFn: () => getPlaycountRank({
            page, gtype, version,
        }),
    });

    return (
        <>
            <section className={'flex flex-col gap-[5px] w-full'}>
                {ranking?.users.map((user, index) => (
                    <PlayCountRankUser
                        key={user.id}
                        {...user}
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