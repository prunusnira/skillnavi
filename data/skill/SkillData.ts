import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface SkillData
    extends Model<
        InferAttributes<SkillData>,
        InferCreationAttributes<SkillData>
    > {
    id: number;
    name: string;
    difficulty: number;
    version: number;
    mode: number;
    rate: number;
    skill: number;
    rank: string;
    date: string;
}
