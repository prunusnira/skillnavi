import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Profile
    extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
    id: number;
    titletower: string;
    title: string;
    name: string;
    token: string;
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
}
