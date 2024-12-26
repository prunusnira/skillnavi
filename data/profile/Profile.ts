// 신규 프로필 정보
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Profile
    extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
    id: number;
    titletower: string;
    title: string;
    name: string;
    unique_id: string;
    openinfo: number;
    comment: string;
    update_at: string;
    blocked: number;
    reason: string;
    joindate: string;
}
