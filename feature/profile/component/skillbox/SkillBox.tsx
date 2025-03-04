'use client';

import { cn } from '@/lib/cn';
import SkillBoxRow from '@/feature/profile/component/skillbox/SkillBoxRow';
import SkillBoxCell from '@/feature/profile/component/skillbox/SkillBoxCell';
import SkillColor from '@/common/skillColor/SkillColor';
import useSkillBox from '@/feature/profile/component/skillbox/useSkillBox';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';
import { useAtomValue } from 'jotai';
import { atomGameVersionList } from '@/common/game/data/atomGameVersion';

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
        </section>
    );
};

export default SkillBox;
