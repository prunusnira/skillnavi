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
        case 1:
            maxSkill = 'MAX(sall.level*sall.ratetb*20) AS skill';
            break;
        case 2:
            maxSkill = 'MAX(sall.level*sall.ratetbre*20) AS skill';
            break;
        case 3:
            maxSkill = 'MAX(sall.level*sall.ratemx*20) AS skill';
            break;
        case 4:
            maxSkill = 'MAX(sall.level*sall.rateex*20) AS skill';
            break;
        case 5:
            maxSkill = 'MAX(sall.level*sall.ratenx*20) AS skill';
            break;
        case 6:
            maxSkill = 'MAX(sall.level*sall.ratehv*20) AS skill';
            break;
        case 7:
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
