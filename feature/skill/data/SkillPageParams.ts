import { GameType } from '@/common/game/data/GameType';
import { SkillOrder } from '@/feature/skill/data/SkillOrder';
import { TableType } from '@/feature/skill/data/TableType';
import { TableDataType } from '@/feature/skill/data/TableDataType';

export interface SkillPageParams {
    id: number;
    game: GameType;
    pageType: TableDataType;
    version: number;
    page?: number;
    order?: SkillOrder;
    display: TableType;
}
