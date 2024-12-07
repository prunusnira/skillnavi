import { TableType } from '@/data/skill/TableType';
import { TableDataType } from '@/data/skill/TableDataType';
import { GameType } from '@/data/game/GameType';
import { OrderType } from '@/data/skill/OrderType';

export interface SkillTableOptions {
    page: number;
    game: GameType;
    versionId: number;
    order?: OrderType;
    data: TableDataType;
    table: TableType;
}
