import { useCallback, useMemo } from 'react';
import { Pattern } from '@/feature/music/data/Pattern';
import { Skill } from '@/feature/skill/data/Skill';
import { cn } from '@/lib/cn';
import style from './MusicCell.module.css';
import Image from 'next/image';
import { IMG } from '@/url/url';
import { convertRank } from '@/lib/game/convertRank';

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

    const rate = skill?.find((s) => s.patterncode === patterncode)?.rate;
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
                {getLevel(patterncode)?.toFixed(2)}
            </div>

            {/* 기록이 있는 경우 달성률 및 이미지 */}
            {rateString && rateString !== '' && (
                <div className={cn(style.cell, 'link')}>
                    <Image
                        src={`${IMG}/rank/${convertRank('', rate ?? 0)}`}
                        alt={'rank'}
                        width={20}
                        height={20}
                    />
                    {rateString}
                </div>
            )}
        </>
    );
};
