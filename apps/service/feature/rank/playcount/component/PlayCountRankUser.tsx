'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import UserLinkIcon from '@/common/table/user/UserLinkIcon';

interface Props {
    rank: number;
    id: number;
    name: string;
    titletower: string;
    openinfo: boolean;
    gcount: number;
    dcount: number;
}

const PlayCountRankUser = ({
    rank,
    id,
    name,
    titletower,
    openinfo,
    gcount,
    dcount,
}: Props) => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type') || '';
    const value = useMemo(() => {
        if (type === 'gf') {
            return gcount;
        }
        if (type === 'dm') {
            return dcount;
        }
        return gcount + dcount;
    }, [type]);

    return (
        <section className={'list-row'}>
            {/* 랭크 */}
            <div
                className={
                    'w-12 shrink-0 text-center text-sm font-semibold text-slate-500 dark:text-slate-400'
                }
            >
                {rank}
            </div>

            {/* 이름 */}
            <div className={'flex-1'}>
                <UserLinkIcon
                    user={{
                        id,
                        name,
                        titletower,
                        openinfo,
                    }}
                />
            </div>

            {/* 수치 */}
            <div
                className={
                    'w-28 shrink-0 text-center font-semibold tabular-nums'
                }
            >
                {value}
            </div>
        </section>
    );
};

export default PlayCountRankUser;
