import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const EnvModel = sequelize.define(
    'EnvModel',
    {
        keyname: {
            type: DataTypes.STRING,
            unique: true,
        },
        value: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'environment',
        timestamps: false,
    },
);
