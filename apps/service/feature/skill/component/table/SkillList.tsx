'use client';

import { cn } from '@/lib/cn';
import { getSkillCN } from '@/feature/skill/api/getSkillCN';
import { IMG, LINK_MUSIC_INFO } from '@/url/url';
import { convertPatternCode } from '@/lib/game/convertPatternCode';
import { convertLevel } from '@/lib/game/convertLevel';
import { convertRank } from '@/lib/game/convertRank';
import { getClearState } from '@/lib/game/getClearState';
import AlbumArt from '@/common/albumart/AlbumArt';
import AnchorText from '@/common/anchor/AnchorText';
import { useParams, useSearchParams } from 'next/navigation';
import Image from 'next/image';
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

    return (
        <section
            className={cn('flex w-full hover:bg-gray-900', {
                ['bg-blue-100 dark:bg-gray-700']: index % 2 === 1,
                ['bg-blue-200 dark:bg-gray-800']: index % 2 === 0,
            })}
        >
            {/* 색상 */}
            <div
                className={cn(
                    'flex-center w-5 text-sm text-black font-bold',
                    skillColor,
                )}
            >
                {(Number(searchParams.get('page') || 1) - 1) * 32 + index + 1}
            </div>

            {/* 자켓 */}
            <div className={cn('w-12 flex-center')}>
                <AlbumArt
                    mid={skill.mid}
                    className={'rounded-full'}
                />
            </div>

            {/* 곡 정보 */}
            <section className={cn('flex flex-col flex-grow py-2.5')}>
                {/* 제목 */}
                <AnchorText
                    className={cn(
                        'w-full text-ellipsis break-all overflow-hidden whitespace-nowrap',
                        'px-[8px] link',
                    )}
                    text={music.name}
                    path={LINK_MUSIC_INFO({
                        version: Number(searchParams.get('version') || 0),
                        uid: Number(id),
                        mid: skill.mid,
                    })}
                />

                {/* 기타 */}
                <div className={cn('flex gap-[8px] items-center pl-[8px]')}>
                    <div className={cn('flex-center')}>
                        <Image
                            unoptimized={true}
                            alt={'difficulty'}
                            src={`${IMG}/diff/${convertPatternCode(skill.patterncode, 'image')}`}
                            width={80}
                            height={20}
                        />
                    </div>
                    <div className={'text-sm'}>{convertLevel(skill.level)}</div>
                    <div>
                        <Image
                            unoptimized={true}
                            alt={'rank'}
                            src={`${IMG}/rank/${convertRank(skill.maxrank)}`}
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className={cn('font-bold text-sm')}>
                        {getClearState({
                            rate: skill.rate,
                            fc: skill.fc,
                        })}
                    </div>
                </div>
            </section>

            {/* 스킬 / 달성률 */}
            <section className={cn('flex-col-center px-[8px] text-sm')}>
                <div>{(skill.skill / 100).toFixed(2)}</div>
                <div>({(skill.rate / 100).toFixed(2)}%)</div>
            </section>
        </section>
    );
};

export default SkillList;
