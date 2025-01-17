import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface SkillData {
    uid: number;
    mid: number;
    playver: number;
    patterncode: number;
    level: number;
    playcount: number;
    clearcount: number;
    maxrank: string;
    rate: number;
    combo: number;
    fc: number;
    meter: string | null;
    hot: number;
}

export interface Skill
    extends SkillData,
        Model<InferAttributes<Skill>, InferCreationAttributes<Skill>> {}
