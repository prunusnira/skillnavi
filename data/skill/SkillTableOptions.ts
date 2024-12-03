import { TableType } from '@/data/skill/TableType';
import { TableDataType } from '@/data/skill/TableDataType';

export interface SkillTableOptions {
    versionId: number;
    data: TableDataType;
    table: TableType;
}
