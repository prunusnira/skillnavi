import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface ProfileBasic
    extends Model<
        InferAttributes<ProfileBasic>,
        InferCreationAttributes<ProfileBasic>
    > {
    id: number;
    titletower: string;
    title: string;
    name: string;
    gskill: number;
    dskill: number;
    token: string;
}
