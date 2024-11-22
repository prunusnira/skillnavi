import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const SkillOldModel = sequelize.define('SkillOldModel', {
    userid: {
        type: DataTypes.INTEGER,
    },
    musicid: {
        type: DataTypes.INTEGER,
    },
    version: {
        type: DataTypes.INTEGER,
    },
    patterncode: {
        type: DataTypes.INTEGER,
    },
    playtime: {
        type: DataTypes.INTEGER,
    },
    cleartime: {
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
    score: {
        type: DataTypes.INTEGER,
    },
    combo: {
        type: DataTypes.INTEGER,
    },
    skill: {
        type: DataTypes.INTEGER,
    },
    checkfc: {
        type: DataTypes.STRING,
    },
    meter: {
        type: DataTypes.STRING,
    },
});
