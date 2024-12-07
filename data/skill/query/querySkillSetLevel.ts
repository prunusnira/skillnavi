import { querySkillAll } from '@/data/skill/query/querySkillAll';

interface Params {
    userid: number;
    version: number;
    game: string;
    isHot?: boolean;
    isOthers?: boolean;
}

export const querySkillSetLevel = (params: Params) => {
    const { version } = params;
    let skill = '';
    switch (version) {
        case 24:
            skill = 'sall.level*sall.ratetb*20 AS skill';
            break;
        case 25:
            skill = 'sall.level*sall.ratetbre*20 AS skill';
            break;
        case 26:
            skill = 'sall.level*sall.ratemx*20 AS skill';
            break;
        case 27:
            skill = 'sall.level*sall.rateex*20 AS skill';
            break;
        case 28:
            skill = 'sall.level*sall.ratens*20 AS skill';
            break;
        case 29:
            skill = 'sall.level*sall.ratehv*20 AS skill';
            break;
        case 30:
            skill = 'sall.level*sall.ratefu*20 AS skill';
            break;
        case 0:
        default:
            skill = 'sall.level*sall.rate*20 AS skill';
            break;
    }
    return `
    SELECT
        *,
        ${skill}
    FROM (${querySkillAll(params)}) sall`;
};
