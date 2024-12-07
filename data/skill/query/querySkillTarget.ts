import { querySkillSetLevel } from '@/data/skill/query/querySkillSetLevel';
import { querySkillMaxMusicId } from '@/data/skill/query/querySkillMaxMusicId';

interface Params {
    userid: number;
    version: number;
    game: string;
    isHot?: boolean;
    isOthers?: boolean;
}

const getQueryRateByVersion = (version: number) => {
    switch (version) {
        case 24:
            return 'skill.ratetb';
        case 25:
            return 'skill.ratetbre';
        case 26:
            return 'skill.ratemx';
        case 27:
            return 'skill.rateex';
        case 28:
            return 'skill.ratenx';
        case 29:
            return 'skill.ratehv';
        case 30:
            return 'skill.ratefu';
        case 0:
        default:
            return 'skill.rate';
    }
};

export const querySkillTarget = (params: Params) => {
    return `
    SELECT
        skill.musicid,
        skill.mname,
        skill.hurigana,
        skill.ishot,
        skill.patterncode,
        skill.rank,
        ${getQueryRateByVersion(params.version)} as rate,
        skill.version,
        skill.combo,
        skill.playtime,
        skill.level,
        skill.checkfc,
        skill.skill,
        skill.meter
    FROM (${querySkillSetLevel(params)}) skill
    INNER JOIN (${querySkillMaxMusicId(params)}) max
    WHERE
        skill.skill = max.skill
      AND
        skill.musicid = max.musicid
    GROUP BY skill.musicid
    ORDER BY skill.skill DESC LIMIT ${params.isHot || params.isOthers ? 25 : 50}`;
};
