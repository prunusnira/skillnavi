import { querySkillAll } from '@/data/skill/query/querySkillAll';

interface Params {
    userid: number;
    version: number;
    game: string;
    isHot?: boolean;
    isOthers?: boolean;
}

export const querySkillMaxMusicId = (params: Params) => {
    const { version } = params;

    let maxSkill = '';
    switch (version) {
        case 24:
            maxSkill = 'MAX(sall.level*sall.ratetb*20) AS skill';
            break;
        case 25:
            maxSkill = 'MAX(sall.level*sall.ratetbre*20) AS skill';
            break;
        case 26:
            maxSkill = 'MAX(sall.level*sall.ratemx*20) AS skill';
            break;
        case 27:
            maxSkill = 'MAX(sall.level*sall.rateex*20) AS skill';
            break;
        case 28:
            maxSkill = 'MAX(sall.level*sall.ratenx*20) AS skill';
            break;
        case 29:
            maxSkill = 'MAX(sall.level*sall.ratehv*20) AS skill';
            break;
        case 30:
            maxSkill = 'MAX(sall.level*sall.ratefu*20) AS skill';
            break;
        case 0:
        default:
            maxSkill = 'MAX(sall.level*sall.rate*20) AS skill';
            break;
    }

    return `
    SELECT
        sall.musicid,
        ${maxSkill}
    FROM (${querySkillAll(params)}) sall
    group by musicid`;
};
