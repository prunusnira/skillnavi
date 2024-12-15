import { Skill } from '@/data/skill/Skill';
import { useMemo } from 'react';

interface Props {
    skill: Skill;
    level: number;
    patterncode: number;
}

const useMusicRecordItem = ({ patterncode }: Props) => {
    const difficulty = useMemo(() => {
        switch (patterncode) {
            case 1:
            case 5:
            case 9:
                return 'BASIC';
            case 2:
            case 6:
            case 10:
                return 'ADANCED';
            case 3:
            case 7:
            case 11:
                return 'EXTREME';
            case 4:
            case 8:
            case 12:
                return 'MASTER';
            default:
                return '';
        }
    }, [patterncode]);

    return {
        difficulty,
    };
};

export default useMusicRecordItem;
