import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Skill
    extends Model<InferAttributes<Skill>, InferCreationAttributes<Skill>> {
    uid: number;
    mid: number;
    playver: number;
    patterncode: number;
    playcount: number;
    clearcount: number;
    maxrank: string;
    rate: number;
    combo: number;
    fc: number;
    meter: string | null;
}
