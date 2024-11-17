// 신규 프로필 정보
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Profile
    extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
    id: number;
    tower: string;
    title: string;
    name: string;
    token: string;
    comment: string;
    jointime: string;
    updatetime: string;
    pause: string;
    pausereason: string;
}
