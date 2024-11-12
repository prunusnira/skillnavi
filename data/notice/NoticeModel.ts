import { DataTypes } from 'sequelize';
import { sequelize } from '@/module/lib/db/dbconn';
import { Notice } from '@/data/notice/Notice';

export const NoticeModel = sequelize.define<Notice>(
    'Notice',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        titleK: {
            type: DataTypes.STRING,
        },
        titleJ: {
            type: DataTypes.STRING,
        },
        titleE: {
            type: DataTypes.STRING,
        },
        contentK: {
            type: DataTypes.STRING,
        },
        contentJ: {
            type: DataTypes.STRING,
        },
        contentE: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.TIME,
        },
    },
    {
        tableName: 'notice',
        timestamps: false,
    },
);
