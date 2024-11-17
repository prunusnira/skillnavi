import { sequelize } from '@/module/lib/db/dbconn';
import { ProfileOld } from '@/data/profile/ProfileOld';
import { DataTypes } from 'sequelize';

export const ProfileOldModel = sequelize.define<ProfileOld>(
    'ProfileOld',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        titletower: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        token: {
            type: DataTypes.STRING,
            unique: true,
        },
        comment: {
            type: DataTypes.STRING,
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
        opencount: {
            type: DataTypes.STRING,
        },
        countall: {
            type: DataTypes.INTEGER,
        },
        countgf: {
            type: DataTypes.INTEGER,
        },
        countdm: {
            type: DataTypes.INTEGER,
        },
        updatetime: {
            type: DataTypes.STRING,
        },
        uptimelong: {
            type: DataTypes.INTEGER,
        },
        pausetype: {
            type: DataTypes.STRING,
        },
        pausedate: {
            type: DataTypes.STRING,
        },
        gskill: {
            type: DataTypes.INTEGER,
        },
        dskill: {
            type: DataTypes.INTEGER,
        },
        gskillfu: {
            type: DataTypes.INTEGER,
        },
        dskillfu: {
            type: DataTypes.INTEGER,
        },
        gskillhv: {
            type: DataTypes.INTEGER,
        },
        dskillhv: {
            type: DataTypes.INTEGER,
        },
        gskillnx: {
            type: DataTypes.INTEGER,
        },
        dskillnx: {
            type: DataTypes.INTEGER,
        },
        gskillex: {
            type: DataTypes.INTEGER,
        },
        dskillex: {
            type: DataTypes.INTEGER,
        },
        gskillmx: {
            type: DataTypes.INTEGER,
        },
        dskillmx: {
            type: DataTypes.INTEGER,
        },
        gskilltbre: {
            type: DataTypes.INTEGER,
        },
        dskilltbre: {
            type: DataTypes.INTEGER,
        },
        gskilltb: {
            type: DataTypes.INTEGER,
        },
        dskilltb: {
            type: DataTypes.INTEGER,
        },
        gskillall: {
            type: DataTypes.INTEGER,
        },
        dskillall: {
            type: DataTypes.INTEGER,
        },
    },
    {
        tableName: 'profile',
        timestamps: false,
    },
);
