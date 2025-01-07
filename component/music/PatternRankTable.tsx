'use client';

import usePatternRankTable from '@/component/music/usePatternRankTable';
import { cn } from '@/module/util/cn';
import { getSkillCN } from '@/module/api/skill/getSkillCN';
import { IMG } from '@/data/url';
import { MUSICLIST_SIZE } from '@/data/env/constant';
import Pager from '@/component/common/pager/Pager';

interface Props {
    page: number;
    level: number;
}

const PatternRankTable = ({ level, page }: Props) => {
    const { rankTableData, pages, isLoading } = usePatternRankTable();

    if (!pages) return null;

    if (isLoading) {
        return 'Loading';
    }

    return (
        <section className={cn('flex-col-center max-w-3xl w-full')}>
            {rankTableData.map((row, index) => {
                const skillValue = Math.floor((row.rate * level) / 500) / 100;
                const skillColor = getSkillCN(skillValue * 50);

                return (
                    <section
                        key={index}
                        className={cn('flex w-full h-[68px]')}
                    >
                        {/* 색상 */}
                        <div
                            className={cn(
                                'flex-center w-5 text-sm text-black font-bold',
                                skillColor,
                            )}
                        >
                            {(page - 1) * MUSICLIST_SIZE + index + 1}
                        </div>

                        {/* 사용자 */}
                        <div
                            className={cn(
                                'flex-grow flex items-center gap-2 py-2 pl-2',
                            )}
                        >
                            <div
                                className={cn({
                                    ['hidden']: !row.icon,
                                })}
                            >
                                <img
                                    alt={'usericon'}
                                    className={cn('w-12 h-12')}
                                    src={`${IMG}/title/${row.icon}.png`}
                                />
                            </div>
                            <div className={cn('text-xl font-semibold link')}>
                                {row.name}
                            </div>
                        </div>

                        {/* 데이터 */}
                        <div className={cn('flex-center')}>
                            {/* 달성률 */}
                            <div className={cn('px-2.5 text-center font-bold')}>
                                {(row.rate / 100).toFixed(2)}%
                            </div>

                            {/* 스킬 */}
                            <div className={cn('px-2.5 text-center font-bold')}>
                                {skillValue}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* 페이저 */}
            <Pager
                page={Number(page)}
                allpage={pages}
            />
        </section>
    );
};

export default PatternRankTable;
