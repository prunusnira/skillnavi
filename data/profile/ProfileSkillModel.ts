import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const ProfileSkillModel = sequelize.define(
    'ProfileSkillModel',
    {
        uid: {
            type: DataTypes.INTEGER,
        },
        version: {
            type: DataTypes.INTEGER,
        },
        gskill: {
            type: DataTypes.INTEGER,
        },
        dskill: {
            type: DataTypes.INTEGER,
        },
        gall: {
            type: DataTypes.INTEGER,
        },
        dall: {
            type: DataTypes.INTEGER,
        },
        gclearlv: {
            type: DataTypes.INTEGER,
        },
        dclearlv: {
            type: DataTypes.INTEGER,
        },
        gclearnum: {
            type: DataTypes.INTEGER,
        },
        dclearnum: {
            type: DataTypes.INTEGER,
        },
        gfclv: {
            type: DataTypes.INTEGER,
        },
        dfclv: {
            type: DataTypes.INTEGER,
        },
        gfcnum: {
            type: DataTypes.INTEGER,
        },
        dfcnum: {
            type: DataTypes.INTEGER,
        },
        gexclv: {
            type: DataTypes.INTEGER,
        },
        dexclv: {
            type: DataTypes.INTEGER,
        },
        gexcnum: {
            type: DataTypes.INTEGER,
        },
        dexcnum: {
            type: DataTypes.INTEGER,
        },
        gcount: {
            type: DataTypes.INTEGER,
        },
        dcount: {
            type: DataTypes.INTEGER,
        },
        lastupdate: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        tableName: 'ProfileSkill',
    },
);
