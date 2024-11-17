import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface GameVersion
    extends Model<
        InferAttributes<GameVersion>,
        InferCreationAttributes<GameVersion>
    > {
    id: number;
    short: string;
    full: string;
}
