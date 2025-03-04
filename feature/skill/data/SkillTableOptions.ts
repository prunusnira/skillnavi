import { TableType } from '@/feature/skill/data/TableType';
import { TableDataType } from '@/feature/skill/data/TableDataType';
import { GameType } from '@/common/game/data/GameType';
import { OrderType } from '@/feature/skill/data/OrderType';

export interface SkillTableOptions {
    page: number;
    game: GameType;
    versionId: number;
    order?: OrderType;
    data: TableDataType;
    table: TableType;
}
