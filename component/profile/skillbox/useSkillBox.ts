import { ProfileOld } from '@/data/profile/ProfileOld';
import { useAtomValue } from 'jotai';
import { atomEnv } from '@/jotai/atomEnv';
import { VER_TB } from '@/data/env/constant';
import { SkillTableBox } from '@/data/skill/SkillTableBox';
import { useMemo } from 'react';

interface Props {
    profile: ProfileOld;
}

const useSkillBox = ({ profile }: Props) => {
    const env = useAtomValue(atomEnv);
    const skillBoxOld = useMemo(() => {
        const ver = env.currentVersion || 31;
        const list: SkillTableBox[] = [];

        if (!ver) return list;

        for (let v = ver; v > VER_TB; v--) {
            if (v === 31) {
                list.push({
                    version: v,
                    gf: profile.gskill,
                    dm: profile.dskill,
                });
            } else if (v === 30) {
                list.push({
                    version: v,
                    gf: profile.gskillfu,
                    dm: profile.dskillfu,
                });
            } else if (v === 29) {
                list.push({
                    version: v,
                    gf: profile.gskillhv,
                    dm: profile.dskillhv,
                });
            } else if (v === 28) {
                list.push({
                    version: v,
                    gf: profile.gskillnx,
                    dm: profile.dskillnx,
                });
            } else if (v === 27) {
                list.push({
                    version: v,
                    gf: profile.gskillex,
                    dm: profile.dskillex,
                });
            } else if (v === 26) {
                list.push({
                    version: v,
                    gf: profile.gskillmx,
                    dm: profile.dskillmx,
                });
            } else if (v === 25) {
                list.push({
                    version: v,
                    gf: profile.gskilltbre,
                    dm: profile.dskilltbre,
                });
            } else if (v === 24) {
                list.push({
                    version: v,
                    gf: profile.gskilltb,
                    dm: profile.dskilltb,
                });
            }
        }

        return list;
    }, []);

    return {
        skillBox: skillBoxOld,
    };
};

export default useSkillBox;
