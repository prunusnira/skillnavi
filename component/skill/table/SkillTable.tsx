import { cn } from '@/module/util/cn';
import Card from '@/component/common/card/Card';
import { getSkillTable } from '@/module/api/skill/getSkillTable';
import SkillItem from './SkillItem';
import SkillColor from '@/component/common/skillColor/SkillColor';
import { getProfile } from '@/module/api/profile/getProfile';

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
    };
}) => {
    const { id } = params;
    const { page, game, version, order, pageType } = searchParams;
    const skill = await getSkillTable({
        id,
        page,
        game,
        version,
        order,
        pageType,
    });
    const { profile } = await getProfile(id);

    if (!skill?.data) {
        return <>No skill data</>;
    }

    return (
        <Card title="Skill">
            {/* 타이틀 */}
            <section>
                {/* 버전 */}
                <section className={cn('flex-col-center')}></section>
                {/* 게임 / 유저 */}
                <section className={cn('flex-col-center')}></section>
            </section>
            {/* 스킬 */}
            <section className={cn('flex justify-around')}>
                <div>
                    <div>ALL</div>
                    <SkillColor value={profile.gskill + profile.dskill} />
                </div>
                <div>
                    <div>GF</div>
                    <SkillColor value={profile.gskill} />
                </div>
                <div>
                    <div>DM</div>
                    <SkillColor value={profile.dskill} />
                </div>
            </section>
            {/* 테이블 */}
            <section>
                {skill.data.map((item) => (
                    <SkillItem
                        key={item.id}
                        skill={item}
                    />
                ))}
            </section>
        </Card>
    );
};

export default SkillTable;
