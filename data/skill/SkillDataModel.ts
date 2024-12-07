import { sequelize } from '@/module/lib/db/dbconn';
import { DataTypes } from 'sequelize';

export const SkillDataModel = sequelize.define('SkillDataModel', {
    id: {
        type: DataTypes.INTEGER,
    },
});
