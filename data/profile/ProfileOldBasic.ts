import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface ProfileOldBasic
    extends Model<
        InferAttributes<ProfileOldBasic>,
        InferCreationAttributes<ProfileOldBasic>
    > {
    id: number;
    titletower: string;
    title: string;
    name: string;
    gskill: number;
    dskill: number;
    token: string;
}
