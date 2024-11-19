import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const RecentModel = sequelize.define(
    'RecentModel',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        titletower: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        gskill: {
            type: DataTypes.STRING,
        },
        dskill: {
            type: DataTypes.STRING,
        },
        updatetime: {
            type: DataTypes.STRING,
        },
        opencount: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'profile',
        timestamps: false,
    },
);
