import { useAtomValue } from 'jotai';
import { VER_TB } from '@/feature/env/data/constant';
import { SkillTableBox } from '@/feature/skill/data/SkillTableBox';
import { useMemo } from 'react';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';
import { atomEnv } from '@/feature/env/data/AtomEnv';

interface Props {
    skill: ProfileSkill[];
}

const useSkillBox = ({ skill }: Props) => {
    const env = useAtomValue(atomEnv);
    const skillBox = useMemo(() => {
        const ver = env.currentVersion || 31;
        const list: SkillTableBox[] = [];
        if (!ver) return list;

        for (let v = ver; v >= VER_TB; v--) {
            const versionData = skill.find((data) => data.version === v);
            list.push({
                version: v,
                gf: versionData ? versionData.gskill / 100 : 0,
                dm: versionData ? versionData.dskill / 100 : 0,
            });
        }

        return list;
    }, [skill]);

    return {
        skillBox,
    };
};

export default useSkillBox;
