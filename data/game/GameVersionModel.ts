import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const GameVersionModel = sequelize.define(
    'GameVersionModel',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
        },
        short: {
            type: DataTypes.STRING,
        },
        full: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'GameVersion',
        timestamps: false,
    },
);
