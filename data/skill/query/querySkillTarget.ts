import { querySkillSetLevel } from '@/data/skill/query/querySkillSetLevel';
import { querySkillMaxMusicId } from '@/data/skill/query/querySkillMaxMusicId';

interface Params {
    userid: number;
    version: number;
    game: string;
    isHot?: boolean;
    isOthers?: boolean;
}

export const querySkillTarget = (params: Params) => {
    return `
    SELECT
        skill.musicid,
        skill.mname,
        skill.hurigana,
        skill.ishot,
        skill.patterncode,
        skill.rank,
        skill.rate,
        skill.ratefu,
        skill.ratehv,
        skill.ratenx,
        skill.rateex,
        skill.ratemx,
        skill.ratetbre,
        skill.ratetb,
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
    ORDER BY skill.skill DESC LIMIT 50`;
};
