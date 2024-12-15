import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface ProfileSkill
    extends Model<
        InferAttributes<ProfileSkill>,
        InferCreationAttributes<ProfileSkill>
    > {
    uid: number;
    version: number;
    gskill: number;
    dskill: number;
    gall: number;
    dall: number;
    gclearlv: number;
    dclearlv: number;
    gclearnum: number;
    dclearnum: number;
    gfclv: number;
    dfclv: number;
    gfcnum: number;
    dfcnum: number;
    gexclv: number;
    dexclv: number;
    gexcnum: number;
    dexcnum: number;
    gcount: number;
    dcount: number;
    lastupdate: string;
}
