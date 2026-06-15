'use client';

import { useSearchParams } from 'next/navigation';
import SkillColor from '@/common/skillColor/SkillColor';
import UserLinkIcon from '@/common/table/user/UserLinkIcon';
import { SkillRank } from '@/feature/skill/data/SkillRank';

interface Props {
    rank: number;
    data: SkillRank;
}

const SkillRankUser = ({ rank, data }: Props) => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

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
                        id: data.uid,
                        name: data.name,
                        titletower: data.titletower,
                        openinfo: data.openinfo,
                    }}
                />
            </div>

            {/* 기준 */}
            <div
                className={
                    'w-10 shrink-0 text-center text-xs font-semibold text-slate-500 dark:text-slate-400'
                }
            >
                {type?.toUpperCase()}
            </div>

            {/* 수치 */}
            <div className={'w-28 shrink-0 text-center'}>
                <SkillColor value={data.value / 100} />
            </div>
        </section>
    );
};

export default SkillRankUser;
