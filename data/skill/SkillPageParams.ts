import { GameVersion } from '@/data/game/GameVersion';
import { GameType } from '@/data/game/GameType';
import { SkillOrder } from '@/data/skill/SkillOrder';
import { TableType } from '@/data/skill/TableType';
import { TableDataType } from '@/data/skill/TableDataType';

export interface SkillPageParams {
    id: number;
    game: GameType;
    pageType: TableDataType;
    version: GameVersion;
    page?: number;
    order?: SkillOrder;
    display: TableType;
}
