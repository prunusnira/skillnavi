import { SkillOld } from '@/data/skill/SkillOld';
import { cn } from '@/module/util/cn';
import { getSkillCN } from '@/module/api/skill/getSkillCN';
import { ALBUM, IMG } from '@/data/url';
import { convertPatternCode } from '@/module/util/convertPatternCode';
import { convertLevel } from '@/module/util/convertLevel';
import { convertRank } from '@/module/util/convertRank';
import { getClearState } from '@/module/util/getClearState';
import SkillItemVersion from '@/component/skill/table/SkillItemVersion';

interface Props {
    skill: SkillOld;
    index: number;
}

const SkillGridTypeOld = ({ skill, index }: Props) => {
    const skillColor = getSkillCN((skill.skill * 50) / 1000000);

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
            <div
                className={cn(
                    'w-full text-center text-ellipsis break-all overflow-hidden whitespace-nowrap',
                    'px-2',
                )}
            >
                {skill.mname}
            </div>

            <section className={cn('flex w-full px-2')}>
                {/* 자켓 */}
                <div className={cn('w-12 flex-col-center')}>
                    <img
                        className={cn('w-12 h-12 rounded-full')}
                        alt="jacket"
                        src={`${ALBUM}/${skill.musicid}.jpg`}
                    />
                    <SkillItemVersion
                        version={skill.version}
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
                        <div>{convertLevel(skill.level)}</div>
                    </div>
                    <div className={cn('flex justify-around')}>
                        <img
                            className={cn('w-5')}
                            alt={'rank'}
                            src={`${IMG}/rank/${convertRank(skill.rank)}`}
                        />
                        <div className={cn('font-bold')}>
                            {getClearState({
                                rate: skill.rate,
                                fc: skill.checkfc === 'Y',
                                short: true,
                            })}
                        </div>
                    </div>
                </section>
            </section>

            {/* 스킬 / 달성률 */}
            <section className={cn('flex justify-around items-center w-full')}>
                <div>{(skill.skill / 1000000).toFixed(2)}</div>
                <div>{(skill.rate / 100).toFixed(2)}%</div>
            </section>
        </section>
    );
};

export default SkillGridTypeOld;
