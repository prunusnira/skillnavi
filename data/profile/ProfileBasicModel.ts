import { ProfileBasic } from '@/data/profile/ProfileBasic';
import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const ProfileBasicModel = sequelize.define<ProfileBasic>(
    'ProfileBasic',
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
        gskill: {
            type: DataTypes.INTEGER,
        },
        dskill: {
            type: DataTypes.INTEGER,
        },
        token: {
            type: DataTypes.STRING,
            unique: true,
        },
    },
    {
        tableName: 'profile',
        timestamps: false,
    },
);
