import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface RecentOld
    extends Model<
        InferAttributes<RecentOld>,
        InferCreationAttributes<RecentOld>
    > {
    titletower: string;
    id: number;
    name: string;
    gskill: string;
    dskill: string;
    updatetime: string;
    opencount: 'Y' | 'N';
}
