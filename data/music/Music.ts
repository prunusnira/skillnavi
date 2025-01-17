import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface MusicData {
    id: number;
    name: string;
    furigana: string;
    composer: string;
    version: number;
    hot: number;
    remove: number;
}

export interface Music
    extends MusicData,
        Model<InferAttributes<Music>, InferCreationAttributes<Music>> {}
