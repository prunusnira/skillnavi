import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface ProfileOld
    extends Model<
        InferAttributes<ProfileOld>,
        InferCreationAttributes<ProfileOld>
    > {
    id: number;
    titletower: string;
    title: string;
    name: string;
    token: string;
    comment: string;
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
    opencount: string;
    countall: number;
    countgf: number;
    countdm: number;
    updatetime: string;
    uptimelong: number;
    pausetype: string;
    pausedate?: string;
    gskill: number;
    dskill: number;
    gskillfu: number;
    dskillfu: number;
    gskillhv: number;
    dskillhv: number;
    gskillnx: number;
    dskillnx: number;
    gskillex: number;
    dskillex: number;
    gskillmx: number;
    dskillmx: number;
    gskilltbre: number;
    dskilltbre: number;
    gskilltb: number;
    dskilltb: number;
    gskillall: number;
    dskillall: number;
}
