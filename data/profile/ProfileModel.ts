import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';
import { Profile } from '@/data/profile/Profile';

export const ProfileModel = sequelize.define<Profile>(
    'ProfileModel',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        unique_id: {
            type: DataTypes.STRING,
        },
        openinfo: {
            type: DataTypes.INTEGER,
        },
        comment: {
            type: DataTypes.STRING,
        },
        update_at: {
            type: DataTypes.STRING,
        },
        blocked: {
            type: DataTypes.INTEGER,
        },
        reason: {
            type: DataTypes.STRING,
        },
        joindate: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        tableName: 'ProfileList',
    },
);
