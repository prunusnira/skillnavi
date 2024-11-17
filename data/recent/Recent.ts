import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Recent
    extends Model<InferAttributes<Recent>, InferCreationAttributes<Recent>> {
    titletower: string;
    name: string;
    gskill: string;
    dskill: string;
    updatetime: string;
    opencount: boolean;
}
