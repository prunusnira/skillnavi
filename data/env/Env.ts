import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Env
    extends Model<InferAttributes<Env>, InferCreationAttributes<Env>> {
    key: string;
    value: string;
}
