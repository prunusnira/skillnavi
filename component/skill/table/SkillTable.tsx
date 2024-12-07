'use client';

import { cn } from '@/module/util/cn';
import Card from '@/component/common/card/Card';
import SkillListTypeOld from './SkillListTypeOld';
import SkillColor from '@/component/common/skillColor/SkillColor';
import SkillGridTypeOld from '@/component/skill/table/SkillGridTypeOld';
import { IMG } from '@/data/url';
import SkillMenu from '@/component/skill/menu/SkillMenu';
import SkillTableTitleVersion from '@/component/skill/table/SkillTableTitleVersion';
import { TableType } from '@/data/skill/TableType';
import useSkillTable from '@/component/skill/table/useSkillTable';
import { TableDataType } from '@/data/skill/TableDataType';

const SkillTable = async ({
    searchParams,
}: {
    searchParams: {
        page: number;
        game: string;
        version: number;
        order: string;
        pageType: TableDataType;
        display: TableType;
    };
}) => {
    const { game, version, display, pageType } = searchParams;
    const {
        skillall,
        skillhot,
        skillother,
        profile,
        hotvalue,
        othervalue,
        isLoadingAll,
        isLoadingHot,
        isLoadingOther,
        skill,
    } = useSkillTable();

    if (isLoadingAll || isLoadingHot || isLoadingOther) {
        return <>Loading</>;
    }

    if (!profile) {
        return <>No user data</>;
    }

    return (
        <Card title="Skill">
            {/* 메뉴버튼 영역 */}
            <SkillMenu />

            {/* 타이틀 */}
            <section className={cn('text-2xl font-bold')}>
                {/* 버전 */}
                <SkillTableTitleVersion versionId={version} />

                {/* 게임 / 유저 */}
                <section className={cn('flex-center')}>
                    <div>
                        {game === 'gf' && 'GuitarFreaks'}
                        {game === 'dm' && 'DrumMania'}
                    </div>
                    <div>&nbsp;by&nbsp;</div>
                    <div className={cn('flex-center gap-1')}>
                        {profile.titletower && (
                            <img
                                className={cn('w-5 h-5')}
                                alt={'tower'}
                                src={`${IMG}/title/${profile.titletower}.png`}
                            />
                        )}
                        {profile.name}
                    </div>
                </section>
            </section>

            {/* 스킬 */}
            <section
                className={cn(
                    'flex-col-center w-full max-w-[600px] bg-black my-5 rounded-2xl',
                )}
            >
                <section className={cn('flex justify-around w-full py-2.5')}>
                    <div className={cn('flex-col-center')}>
                        <div>ALL</div>
                        <SkillColor
                            value={skill?.all || 0}
                            multiplier={1 / 2}
                        />
                    </div>
                    <div className={cn('flex-col-center')}>
                        <div>GF</div>
                        <SkillColor value={skill?.gf || 0} />
                    </div>
                    <div className={cn('flex-col-center')}>
                        <div>DM</div>
                        <SkillColor value={skill?.dm || 0} />
                    </div>
                </section>

                {pageType === 'target' && (
                    <section
                        className={cn('flex justify-around w-full py-2.5')}
                    >
                        <div className={cn('flex-col-center')}>
                            <div>SKILL</div>
                            <SkillColor value={(hotvalue + othervalue) / 100} />
                        </div>
                        <div className={cn('flex-col-center')}>
                            <div>HOT</div>
                            <SkillColor
                                value={hotvalue / 100}
                                multiplier={2}
                            />
                        </div>
                        <div className={cn('flex-col-center')}>
                            <div>OTHER</div>
                            <SkillColor
                                value={othervalue / 100}
                                multiplier={2}
                            />
                        </div>
                    </section>
                )}
            </section>

            {/* 테이블 */}
            {pageType === 'all' && display === 'list' && skillall?.length && (
                <section className={cn('w-full max-w-screen-lg')}>
                    {skillall?.map((item, index) => (
                        <SkillListTypeOld
                            key={item.musicid}
                            skill={item}
                            index={index}
                        />
                    ))}
                </section>
            )}
            {pageType === 'target' &&
                display === 'list' &&
                skillhot?.length && (
                    <>
                        <div className={cn('font-bold text-xl')}>HOT</div>
                        <section className={cn('w-full max-w-screen-lg')}>
                            {skillhot?.map((item, index) => (
                                <SkillListTypeOld
                                    key={item.musicid}
                                    skill={item}
                                    index={index}
                                />
                            ))}
                        </section>
                    </>
                )}
            {pageType === 'target' &&
                display === 'list' &&
                skillother?.length && (
                    <>
                        <div className={cn('font-bold text-xl mt-5')}>
                            OTHERS
                        </div>
                        <section className={cn('w-full max-w-screen-lg')}>
                            {skillother?.map((item, index) => (
                                <SkillListTypeOld
                                    key={item.musicid}
                                    skill={item}
                                    index={index}
                                />
                            ))}
                        </section>
                    </>
                )}

            {/* 그리드 */}
            {pageType === 'all' && display === 'grid' && skillall?.length && (
                <section
                    className={cn(
                        'w-full grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 max-w-screen-lg',
                    )}
                >
                    {skillall?.map((item, index) => (
                        <SkillGridTypeOld
                            key={item.musicid}
                            skill={item}
                            index={index}
                        />
                    ))}
                </section>
            )}
            {pageType === 'target' &&
                display === 'grid' &&
                skillhot?.length && (
                    <>
                        <div className={cn('font-bold text-xl')}>HOT</div>
                        <section
                            className={cn(
                                'w-full grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 max-w-screen-lg',
                            )}
                        >
                            {skillhot?.map((item, index) => (
                                <SkillGridTypeOld
                                    key={item.musicid}
                                    skill={item}
                                    index={index}
                                />
                            ))}
                        </section>
                    </>
                )}
            {pageType === 'target' &&
                display === 'grid' &&
                skillother?.length && (
                    <>
                        <div className={cn('font-bold text-xl mt-5')}>
                            OTHERS
                        </div>
                        <section
                            className={cn(
                                'w-full grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 max-w-screen-lg',
                            )}
                        >
                            {skillother?.map((item, index) => (
                                <SkillGridTypeOld
                                    key={item.musicid}
                                    skill={item}
                                    index={index}
                                />
                            ))}
                        </section>
                    </>
                )}
        </Card>
    );
};

export default SkillTable;
