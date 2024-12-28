import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';
import { Pattern } from '@/data/pattern/Pattern';

export const PatternModel = sequelize.define<Pattern>(
    'PatternList',
    {
        mid: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        patterncode: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        version: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        level: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
        tableName: 'PatternList',
    },
);
