import { SkillOld } from '@/data/skill/SkillOld';
import { cn } from '@/module/util/cn';
import { getSkillCN } from '@/module/api/skill/getSkillCN';
import { ALBUM } from '@/data/url';

interface Props {
    skill: SkillOld;
}

const SkillItemOld = ({ skill }: Props) => {
    const skillColor = getSkillCN((skill.skill * 50) / 1000000);

    return (
        <section className={cn('flex w-full')}>
            {/* 색상 */}
            <div className={cn('w-2.5 h-full', skillColor)}></div>

            {/* 자켓 */}
            <div>
                <img
                    className={cn('w-12 h-12 rounded-full')}
                    alt="jacket"
                    src={`${ALBUM}/${skill.musicid}.jpg`}
                />
            </div>

            {/* 곡 정보 */}
            <section className={cn('flex flex-col flex-grow')}>
                {/* 제목 */}
                <div>{skill.mname}</div>

                {/* 기타 */}
                <div className={cn('flex-center')}></div>
            </section>

            {/* 스킬 / 달성률 */}
            <section>
                <div></div>
                <div></div>
            </section>
        </section>
    );
};

export default SkillItemOld;
