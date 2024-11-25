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
        case 1:
            skill = 'sall.level*sall.ratetb*20 AS skill';
            break;
        case 2:
            skill = 'sall.level*sall.ratetbre*20 AS skill';
            break;
        case 3:
            skill = 'sall.level*sall.ratemx*20 AS skill';
            break;
        case 4:
            skill = 'sall.level*sall.rateex*20 AS skill';
            break;
        case 5:
            skill = 'sall.level*sall.ratens*20 AS skill';
            break;
        case 6:
            skill = 'sall.level*sall.ratehv*20 AS skill';
            break;
        case 7:
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
