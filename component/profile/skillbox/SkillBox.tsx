'use client';

import { cn } from '@/module/util/cn';
import SkillBoxRow from '@/component/profile/skillbox/SkillBoxRow';
import SkillBoxCell from '@/component/profile/skillbox/SkillBoxCell';
import SkillColor from '@/component/common/skillColor/SkillColor';
import { ProfileOld } from '@/data/profile/ProfileOld';
import useSkillBox from '@/component/profile/skillbox/useSkillBox';

interface Props {
    profile: ProfileOld;
}

const SkillBox = ({ profile }: Props) => {
    const { skillBox } = useSkillBox({ profile });
    return (
        <section className={cn('flex-col-center')}>
            <SkillBoxRow>
                <SkillBoxCell>#</SkillBoxCell>
                <SkillBoxCell>GF</SkillBoxCell>
                <SkillBoxCell>DM</SkillBoxCell>
            </SkillBoxRow>
            {skillBox.map((skill) => (
                <SkillBoxRow key={`skill${skill.version}`}>
                    <SkillBoxCell>{skill.version}</SkillBoxCell>
                    <SkillBoxCell>
                        <SkillColor value={skill.gf} />
                    </SkillBoxCell>
                    <SkillBoxCell>
                        <SkillColor value={skill.dm} />
                    </SkillBoxCell>
                </SkillBoxRow>
            ))}

            {/* 하단 클릭 영역 */}
            <div>클릭해서 전체 보기 (팝업으로 열기)</div>
        </section>
    );
};

export default SkillBox;
