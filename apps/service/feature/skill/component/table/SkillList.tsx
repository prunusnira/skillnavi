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
import { SkillForTableWithInfo } from '@/feature/skill/data/Skill';

interface Props {
    skill: SkillForTableWithInfo;
    index: number;
}

const SkillList = ({ skill, index }: Props) => {
    const { id } = useParams<{ id: string }>();
    const { music } = skill;
    const searchParams = useSearchParams();
    const skillColor = getSkillCN((skill.skill / 100) * 50);
    const clearState = getClearState({ rate: skill.rate, fc: skill.fc });

    return (
        <section
            className={cn(
                'flex min-h-16 w-full min-w-0 border-b border-slate-200/80 transition-colors hover:bg-lime-50 md:min-h-20 md:rounded-xl md:border md:px-3 md:shadow-sm dark:border-slate-700/70 dark:hover:bg-lime-950/25',
                index % 2 === 1
                    ? 'bg-white dark:bg-slate-900'
                    : 'bg-slate-50 dark:bg-slate-800/50',
            )}
        >
            {/* 색상 */}
            <div
                className={cn(
                    'flex-center w-6 shrink-0 text-sm font-bold text-black md:w-8',
                    skillColor,
                )}
            >
                {(Number(searchParams.get('page') || 1) - 1) * 32 + index + 1}
            </div>

            {/* 자켓 */}
            <div className={cn('flex-center w-12 shrink-0 md:w-14')}>
                <AlbumArt mid={skill.mid} className={'rounded-full'} />
            </div>

            {/* 곡 정보 */}
            <section
                className={cn('flex min-w-0 flex-1 flex-col py-2.5 md:py-3')}
            >
                {/* 제목 */}
                <AnchorText
                    className={cn(
                        'block w-full min-w-0 truncate px-2 md:px-3 md:text-base',
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

                {/* 기타 */}
                <div
                    className={cn(
                        'flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 pl-2 md:gap-x-3 md:pl-3',
                    )}
                >
                    <div className={cn('flex-center')}>
                        <PatternTag patternCode={skill.patterncode} />
                    </div>
                    <div className={'text-sm font-bold'}>
                        {convertLevel(skill.level)}
                    </div>
                    <RankTag rank={skill.maxrank} rate={skill.rate} />
                    <div
                        className={cn(
                            'min-w-16 shrink-0 whitespace-nowrap font-bold text-sm',
                        )}
                    >
                        {clearState}
                    </div>
                </div>
            </section>

            {/* 스킬 / 달성률 */}
            <section
                className={cn(
                    'flex min-w-[5.5rem] shrink-0 flex-col items-center justify-center px-2 text-sm md:min-w-28 md:px-3 md:text-base',
                )}
            >
                <div>{(skill.skill / 100).toFixed(2)}</div>
                <div>({(skill.rate / 100).toFixed(2)}%)</div>
            </section>
        </section>
    );
};

export default SkillList;
