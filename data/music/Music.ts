import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Music
    extends Model<InferAttributes<Music>, InferCreationAttributes<Music>> {
    id: number;
    name: string;
    furigana: string;
    composer: string;
    version: number;
    hot: number;
    remove: number;
}
