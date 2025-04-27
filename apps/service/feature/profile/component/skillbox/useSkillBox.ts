import { useAtomValue } from 'jotai';
import { VER_TB } from '@/feature/env/data/constant';
import { SkillTableBox } from '@/feature/skill/data/SkillTableBox';
import { useMemo, useState } from 'react';
import { ProfileSkill } from '@/feature/profile/data/ProfileSkill';
import { atomGameVersionLatest } from '@/common/game/data/atomGameVersion';

interface Props {
    skill: ProfileSkill[];
}

const useSkillBox = ({ skill }: Props) => {
    const latest = useAtomValue(atomGameVersionLatest);

    const [
        viewAll,
        setViewAll,
    ] = useState<boolean>(false);

    const skillBox = useMemo(() => {
        const list: SkillTableBox[] = [];
        if (!latest) return list;

        for (let v = latest.id; v >= VER_TB; v--) {
            const versionData = skill.find((data) => data.version === v);
            list.push({
                version: v,
                gf: versionData ? versionData.gskill / 100 : 0,
                dm: versionData ? versionData.dskill / 100 : 0,
            });
        }

        return list;
    }, [
        skill,
        latest,
    ]);

    const openViewBox = () => {
        setViewAll(true);
    };

    const closeViewBox = () => {
        setViewAll(false);
    };

    return {
        skillBox,
        viewAll,
        openViewBox,
        closeViewBox,
    };
};

export default useSkillBox;
