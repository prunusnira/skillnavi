import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const MusicModel = sequelize.define(
    'MusicListModel',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        furigana: {
            type: DataTypes.STRING,
        },
        composer: {
            type: DataTypes.STRING,
        },
        version: {
            type: DataTypes.INTEGER,
        },
        hot: {
            type: DataTypes.INTEGER,
        },
        remove: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
        tableName: 'MusicList',
    },
);
