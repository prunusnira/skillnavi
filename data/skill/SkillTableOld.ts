import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface SkillTableOld
    extends Model<
        InferAttributes<SkillTableOld>,
        InferCreationAttributes<SkillTableOld>
    > {
    musicid: number;
    mname: string;
    hurigana: string;
    ishot: 'Y' | 'N';
    patterncode: number;
    rank: string;
    rate: number;
    ratefu: number;
    ratehv: number;
    ratenx: number;
    rateex: number;
    ratemx: number;
    ratetbre: number;
    ratetb: number;
    version: number;
    combo: number;
    playtime: number;
    level: number;
    checkfc: 'Y' | 'N';
    skill: number;
    meter: string;
}
