import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';
import { Skill } from '@/data/skill/Skill';

export const SkillModel = sequelize.define<Skill>(
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
        level: {
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
        hot: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
        tableName: 'SkillList',
    },
);
