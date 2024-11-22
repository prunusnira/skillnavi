import { SkillData } from '@/data/skill/SkillData';

interface Props {
    skill: SkillData;
}

const SkillItem = ({ skill }: Props) => {
    return (
        <section>
            {/* 색상 */}
            <div></div>

            {/* 자켓 */}
            <div></div>

            {/* 곡 정보 */}
            <section>
                {/* 제목 */}
                <div></div>

                {/* 기타 */}
                <div></div>
            </section>

            {/* 스킬 / 달성률 */}
            <section>
                <div></div>
                <div></div>
            </section>
        </section>
    );
};

export default SkillItem;
