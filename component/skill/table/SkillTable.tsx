import { cn } from '@/module/util/cn';
import Card from '@/component/common/card/Card';
import { getSkillTable } from '@/module/api/skill/getSkillTable';
import SkillListTypeOld from './SkillListTypeOld';
import SkillColor from '@/component/common/skillColor/SkillColor';
import { getProfile } from '@/module/api/profile/getProfile';
import SkillGridTypeOld from '@/component/skill/table/SkillGridTypeOld';
import { IMG } from '@/data/url';
import SkillMenu from '@/component/skill/menu/SkillMenu';
import SkillTableTitleVersion from '@/component/skill/table/SkillTableTitleVersion';

const SkillTable = async ({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: {
        page: number;
        game: string;
        version: number;
        order: string;
        pageType: string;
        display: 'grid' | 'list';
    };
}) => {
    const { id } = params;
    const { page, game, version, order, pageType, display } = searchParams;
    const skill = await getSkillTable({
        id,
        page: page || 1,
        game: game || 'gf',
        version: version,
        order,
        pageType: pageType || 'target',
    });
    const { profile } = await getProfile(id);

    if (!skill?.length) {
        return <>No skill data</>;
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
                    'flex justify-around w-full max-w-[600px] bg-black my-5 rounded-2xl',
                )}
            >
                <div className={cn('flex-col-center')}>
                    <div>ALL</div>
                    <SkillColor
                        value={profile.gskill + profile.dskill}
                        multiplier={1 / 2}
                    />
                </div>
                <div className={cn('flex-col-center')}>
                    <div>GF</div>
                    <SkillColor value={profile.gskill} />
                </div>
                <div className={cn('flex-col-center')}>
                    <div>DM</div>
                    <SkillColor value={profile.dskill} />
                </div>
            </section>

            {/* 테이블 */}
            {display === 'list' && (
                <section className={cn('w-full')}>
                    {skill.map((item, index) => (
                        <SkillListTypeOld
                            key={item.musicid}
                            skill={item}
                            index={index}
                        />
                    ))}
                </section>
            )}

            {/* 그리드 */}
            {display === 'grid' && (
                <section
                    className={cn(
                        'w-full grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4',
                    )}
                >
                    {skill.map((item, index) => (
                        <SkillGridTypeOld
                            key={item.musicid}
                            skill={item}
                            index={index}
                        />
                    ))}
                </section>
            )}
        </Card>
    );
};

export default SkillTable;
