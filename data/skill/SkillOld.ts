import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface SkillOld
    extends Model<
        InferAttributes<SkillOld>,
        InferCreationAttributes<SkillOld>
    > {
    userid: number;
    musicid: number;
    version: number;
    patterncode: number;
    playtime: number;
    cleartime: number;
    rank: string;
    rate: number;
    ratefu: number;
    ratehv: number;
    ratenx: number;
    rateex: number;
    ratemx: number;
    ratetbre: number;
    ratetb: number;
    score: number;
    combo: number;
    skill: number;
    checkfc: 'Y' | 'N';
    meter: string;
}
