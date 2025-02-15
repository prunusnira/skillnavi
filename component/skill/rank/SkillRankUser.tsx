'use client';

import { useSearchParams } from 'next/navigation';

interface Props {
    rank: number;
    name: string;
    value: number;
}

const SkillRankUser = ({ rank, name, value }: Props) => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    return (
        <section className={'flex w-full'}>
            {/* 랭크 */}
            <div className={'w-[50px] px-[10px] text-center'}>{rank}</div>

            {/* 이름 */}
            <div className={'grow'}>{name}</div>

            {/* 기준 */}
            <div className={'px-[10px] text-center'}>{type?.toUpperCase()}</div>

            {/* 수치 */}
            <div className={'px-[10px] text-center'}>
                {(value / 100).toFixed(2)}
            </div>
        </section>
    );
};

export default SkillRankUser;
