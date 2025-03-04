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
        <section className={'flex w-full h-[40px]'}>
            {/* 랭크 */}
            <div className={'w-[50px] px-[10px] text-center shrink-0'}>
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
            <div className={'px-[10px] text-center w-[40px] shrink-0'}>
                {type?.toUpperCase()}
            </div>

            {/* 수치 */}
            <div className={'px-[10px] text-center w-[120px] shrink-0'}>
                <SkillColor value={data.value / 100} />
            </div>
        </section>
    );
};

export default SkillRankUser;
