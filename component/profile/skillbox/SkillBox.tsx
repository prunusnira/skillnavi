'use client';

import { cn } from '@/module/util/cn';
import SkillBoxRow from '@/component/profile/skillbox/SkillBoxRow';
import SkillBoxCell from '@/component/profile/skillbox/SkillBoxCell';
import SkillColor from '@/component/common/skillColor/SkillColor';
import useSkillBox from '@/component/profile/skillbox/useSkillBox';
import { ProfileSkill } from '@/data/profile/ProfileSkill';
import { useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/jotai/atomGameVersion';

interface Props {
    skill: ProfileSkill[];
}

const SkillBox = ({ skill }: Props) => {
    const { skillBox } = useSkillBox({ skill });
    const versionList = useAtomValue(atomGameVersionList);

    return (
        <section className={cn('flex-col-center')}>
            <SkillBoxRow>
                <SkillBoxCell>#</SkillBoxCell>
                <SkillBoxCell>GF</SkillBoxCell>
                <SkillBoxCell>DM</SkillBoxCell>
            </SkillBoxRow>
            {skillBox.map((skill) => (
                <SkillBoxRow key={`skill${skill.version}`}>
                    <SkillBoxCell>
                        {
                            versionList?.find(
                                (version) => version.id === skill.version,
                            )?.short
                        }
                    </SkillBoxCell>
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
