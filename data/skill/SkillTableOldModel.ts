import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const SkillTableOldModel = sequelize.define('SkillOldModel', {
    musicid: {
        type: DataTypes.INTEGER,
    },
    mname: {
        type: DataTypes.STRING,
    },
    hurigana: {
        type: DataTypes.STRING,
    },
    ishot: {
        type: DataTypes.STRING,
    },
    patterncode: {
        type: DataTypes.INTEGER,
    },
    rank: {
        type: DataTypes.STRING,
    },
    rate: {
        type: DataTypes.INTEGER,
    },
    ratefu: {
        type: DataTypes.INTEGER,
    },
    ratehv: {
        type: DataTypes.INTEGER,
    },
    ratenx: {
        type: DataTypes.INTEGER,
    },
    rateex: {
        type: DataTypes.INTEGER,
    },
    ratemx: {
        type: DataTypes.INTEGER,
    },
    ratetbre: {
        type: DataTypes.INTEGER,
    },
    ratetb: {
        type: DataTypes.INTEGER,
    },
    version: {
        type: DataTypes.INTEGER,
    },
    combo: {
        type: DataTypes.INTEGER,
    },
    playtime: {
        type: DataTypes.INTEGER,
    },
    level: {
        type: DataTypes.INTEGER,
    },
    checkfc: {
        type: DataTypes.STRING,
    },
    skill: {
        type: DataTypes.INTEGER,
    },
    meter: {
        type: DataTypes.STRING,
    },
});
