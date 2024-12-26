import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Pattern
    extends Model<InferAttributes<Pattern>, InferCreationAttributes<Pattern>> {
    mid: number;
    patterncode: number;
    version: number;
    level: number;
}
