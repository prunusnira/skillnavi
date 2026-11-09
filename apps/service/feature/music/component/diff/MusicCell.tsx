import { useCallback, useMemo } from 'react';
import { Pattern } from '@/feature/music/data/Pattern';
import { Skill } from '@/feature/skill/data/Skill';
import { cn } from '@/lib/cn';
import style from './MusicCell.module.css';
import RankTag from '@/common/rank/RankTag';

interface Props {
    pattern: Pattern[];
    skill?: Skill[];
    patterncode: number;
}

export const MusicCell = ({ pattern, skill, patterncode }: Props) => {
    const getLevel = useCallback(
        (ptcode: number) => {
            const level = pattern.find((p) => p.patterncode === ptcode)?.level;
            return level ? level / 100 : undefined;
        },
        [pattern],
    );

    const currentSkill = skill?.find((s) => s.patterncode === patterncode);
    const rate = currentSkill?.rate;
    const getRate = useCallback(() => {
        if (rate) {
            return `${(rate / 100).toFixed(2)}%`;
        }
        return '';
    }, [rate]);

    const rateString = useMemo(() => getRate(), [getRate]);

    return (
        <>
            {/* 레벨 */}
            <div className={cn(style.cell, 'link')}>
                <span className="whitespace-nowrap text-sm font-bold sm:text-base">
                    {getLevel(patterncode)?.toFixed(2)}
                </span>
            </div>

            {/* 기록이 있는 경우 달성률 및 랭크 */}
            {rateString && rateString !== '' && (
                <div className={cn(style.cell, 'link')}>
                    <RankTag
                        rank={currentSkill?.maxrank ?? ''}
                        rate={rate ?? 0}
                    />
                    {rateString}
                </div>
            )}
        </>
    );
};
