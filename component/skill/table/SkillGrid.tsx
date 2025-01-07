'use client';

import { cn } from '@/module/util/cn';
import { getSkillCN } from '@/module/api/skill/getSkillCN';
import { IMG, LINK } from '@/data/url';
import { convertPatternCode } from '@/module/util/convertPatternCode';
import { convertLevel } from '@/module/util/convertLevel';
import { convertRank } from '@/module/util/convertRank';
import { getClearState } from '@/module/util/getClearState';
import SkillItemVersion from '@/component/skill/table/SkillItemVersion';
import AlbumArt from '@/component/common/albumart/AlbumArt';
import AnchorText from '@/component/common/AnchorText';
import { useParams, useSearchParams } from 'next/navigation';
import { Skill } from '@/data/skill/Skill';
import { Music } from '@/data/music/Music';
import { useMemo } from 'react';

interface Props {
    music: Music;
    skill: Skill;
    index: number;
    level: number;
}

const SkillGrid = ({ music, skill, level, index }: Props) => {
    const { id } = useParams<{ id: string }>();
    const searchParams = useSearchParams();
    const skillValue = useMemo(
        () => skill.rate * level * 50,
        [
            skill,
            level,
        ],
    );
    const skillColor = getSkillCN(skillValue / 1000000);

    return (
        <section
            className={cn('flex-col-center w-full hover:bg-gray-900', {
                ['bg-gray-600']: index % 2 === 1,
                ['bg-gray-700']: index % 2 === 0,
            })}
        >
            {/* 색상 */}
            <div
                className={cn(
                    'flex-center w-full h-5 text-sm text-black font-bold',
                    skillColor,
                )}
            >
                {index + 1}
            </div>

            {/* 곡 제목 */}
            <AnchorText
                className={cn(
                    'w-full text-center text-ellipsis break-all overflow-hidden whitespace-nowrap',
                    'px-2 link',
                )}
                text={music.name}
                path={LINK.MUSIC.info({
                    version: Number(searchParams.get('version') || 0),
                    uid: Number(id),
                    mid: skill.mid,
                })}
            />

            <section className={cn('flex w-full px-2')}>
                {/* 자켓 */}
                <div className={cn('w-12 flex-col-center')}>
                    <AlbumArt
                        mid={skill.mid}
                        className={cn('w-12 h-12 rounded-full')}
                    />
                    <SkillItemVersion
                        versionId={skill.playver}
                        type={'short'}
                    />
                </div>

                {/* 곡 정보 */}
                <section className={cn('flex flex-col flex-grow py-2.5')}>
                    {/* 기타 */}
                    <div className={cn('flex justify-around')}>
                        <div className={cn('flex-center')}>
                            <img
                                className={cn('w-10')}
                                alt={'difficulty'}
                                src={`${IMG}/diff/${convertPatternCode(skill.patterncode, 'image300')}`}
                            />
                        </div>
                        <div className={cn('flex-center')}>
                            {convertLevel(level)}
                        </div>
                    </div>
                    <div className={cn('flex justify-around')}>
                        <img
                            className={cn('w-5')}
                            alt={'rank'}
                            src={`${IMG}/rank/${convertRank(skill.maxrank)}`}
                        />
                        <div className={cn('font-bold flex-center')}>
                            {getClearState({
                                rate: skill.rate,
                                fc: skill.fc === 1,
                                short: true,
                            })}
                        </div>
                    </div>
                </section>
            </section>

            {/* 스킬 / 달성률 */}
            <section className={cn('flex justify-around items-center w-full')}>
                <div
                    className={cn(
                        'bg-lime-300 w-full text-black font-bold flex-center',
                    )}
                >
                    {(Math.floor(skillValue / 10000) / 100).toFixed(2)}
                </div>
                <div
                    className={cn(
                        'bg-blue-300 w-full text-black font-bold flex-center',
                    )}
                >
                    {(skill.rate / 100).toFixed(2)}%
                </div>
            </section>
        </section>
    );
};

export default SkillGrid;
