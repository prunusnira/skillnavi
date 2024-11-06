import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export interface Notice
    extends Model<InferAttributes<Notice>, InferCreationAttributes<Notice>> {
    id: number;
    titleK: string;
    titleJ: string;
    titleE: string;
    contentK: string;
    contentJ: string;
    contentE: string;
    time: string;
}

export interface NoticeDisplay {
    id: number;
    title: string;
    content: string;
    time: string;
}
