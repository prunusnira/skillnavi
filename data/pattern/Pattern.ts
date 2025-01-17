import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface PatternData {
    mid: number;
    patterncode: number;
    version: number;
    level: number;
}

export interface Pattern
    extends PatternData,
        Model<InferAttributes<Pattern>, InferCreationAttributes<Pattern>> {}
