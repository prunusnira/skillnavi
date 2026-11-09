'use client';

import { cn } from '@/lib/cn';
import { getSkillCN } from '@/feature/skill/api/getSkillCN';
import { LINK_MUSIC_INFO } from '@/url/url';
import { convertLevel } from '@/lib/game/convertLevel';
import { getClearState } from '@/lib/game/getClearState';
import AlbumArt from '@/common/albumart/AlbumArt';
import AnchorText from '@/common/anchor/AnchorText';
import PatternTag from '@/common/pattern/PatternTag';
import RankTag from '@/common/rank/RankTag';
import { useParams, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { SkillForTableWithInfo } from '@/feature/skill/data/Skill';

interface Props {
    skill: SkillForTableWithInfo;
    index: number;
}

const SkillGrid = ({ skill, index }: Props) => {
    const { id } = useParams<{ id: string }>();
    const { music } = skill;
    const searchParams = useSearchParams();
    const skillValue = useMemo(() => skill.rate * skill.level * 20, [skill]);
    const skillColor = getSkillCN((skillValue * 5) / 100000);
    const clearState = getClearState({
        rate: skill.rate,
        fc: skill.fc,
        short: true,
    });

    return (
        <section
            className={cn(
                'flex-col-center h-full w-full transition-colors hover:bg-lime-50 md:overflow-hidden md:rounded-xl md:border md:border-slate-200 md:shadow-sm dark:md:border-slate-700 dark:hover:bg-lime-950/25',
                index % 2 === 1
                    ? 'bg-white dark:bg-slate-900'
                    : 'bg-slate-50 dark:bg-slate-800/50',
            )}
        >
            {/* 색상 */}
            <div
                className={cn(
                    'flex-center h-5 w-full text-sm font-bold text-black',
                    skillColor,
                )}
            >
                {(Number(searchParams.get('page') || 1) - 1) * 32 + index + 1}
            </div>

            {/* 곡 제목 */}
            <AnchorText
                className={cn(
                    'w-full overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1 text-center md:py-2',
                    'font-semibold text-indigo-700 underline-offset-4 transition-colors',
                    'hover:text-indigo-900 hover:underline dark:text-indigo-300 dark:hover:text-indigo-200',
                )}
                text={music.name}
                path={LINK_MUSIC_INFO({
                    version: Number(searchParams.get('version') || 0),
                    uid: Number(id),
                    mid: skill.mid,
                })}
            />

            <section className={cn('flex w-full px-2 md:px-3')}>
                {/* 자켓 */}
                <div className={cn('w-12 flex-col-center md:w-14')}>
                    <AlbumArt mid={skill.mid} className={'rounded-full'} />
                </div>

                {/* 곡 정보 */}
                <section className={cn('flex flex-col flex-grow py-2.5')}>
                    {/* 기타 */}
                    <div className={cn('flex justify-around')}>
                        <div className={cn('flex-center')}>
                            <PatternTag patternCode={skill.patterncode} />
                        </div>
                        <div className={cn('flex-center')}>
                            <span className="font-bold">
                                {convertLevel(skill.level)}
                            </span>
                        </div>
                    </div>
                    <div className={cn('flex justify-around')}>
                        <RankTag rank={skill.maxrank} rate={skill.rate} />
                        <div
                            className={cn(
                                'flex-center min-w-7 shrink-0 font-bold',
                            )}
                        >
                            {clearState}
                        </div>
                    </div>
                </section>
            </section>

            {/* 스킬 / 달성률 */}
            <section className={cn('flex justify-around items-center w-full')}>
                <div
                    className={cn(
                        'flex min-h-7 w-full items-center justify-center bg-lime-300 font-bold text-slate-950 md:min-h-8',
                    )}
                >
                    {(skill.skill / 100).toFixed(2)}
                </div>
                <div
                    className={cn(
                        'flex min-h-7 w-full items-center justify-center bg-slate-200 font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-100 md:min-h-8',
                    )}
                >
                    {(skill.rate / 100).toFixed(2)}%
                </div>
            </section>
        </section>
    );
};

export default SkillGrid;
