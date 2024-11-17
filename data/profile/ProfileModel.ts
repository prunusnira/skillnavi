import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const ProfileModel = sequelize.define('ProfileModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tower: {
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
    },
    comment: {
        type: DataTypes.STRING,
    },
    jointime: {
        type: DataTypes.STRING,
    },
    updatetime: {
        type: DataTypes.STRING,
    },
    pause: {
        type: DataTypes.STRING,
    },
    pausereason: {
        type: DataTypes.STRING,
    },
});
