'use client';

import { useSearchParams } from 'next/navigation';
import SkillColor from '@/component/common/skillColor/SkillColor';
import { clsx } from 'clsx';

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
            <div className={'w-[50px] px-[10px] text-center shrink-0'}>
                {rank}
            </div>

            {/* 이름 */}
            <div
                className={clsx('grow link line-clamp-1', {
                    ['text-red-500']: name.length === 0,
                })}
            >
                {name.length ? name : '(LIMITED DATA)'}
            </div>

            {/* 기준 */}
            <div className={'px-[10px] text-center w-[40px] shrink-0'}>
                {type?.toUpperCase()}
            </div>

            {/* 수치 */}
            <div className={'px-[10px] text-center w-[120px] shrink-0'}>
                <SkillColor value={value / 100} />
            </div>
        </section>
    );
};

export default SkillRankUser;
