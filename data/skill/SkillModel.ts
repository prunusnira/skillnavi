import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const SkillModel = sequelize.define(
    'SkillModel',
    {
        uid: {
            type: DataTypes.INTEGER,
        },
        mid: {
            type: DataTypes.INTEGER,
        },
        playver: {
            type: DataTypes.INTEGER,
        },
        patterncode: {
            type: DataTypes.INTEGER,
        },
        playcount: {
            type: DataTypes.INTEGER,
        },
        clearcount: {
            type: DataTypes.INTEGER,
        },
        maxrank: {
            type: DataTypes.STRING,
        },
        rate: {
            type: DataTypes.INTEGER,
        },
        combo: {
            type: DataTypes.INTEGER,
        },
        fc: {
            type: DataTypes.INTEGER,
        },
        meter: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        tableName: 'SkillList',
    },
);
