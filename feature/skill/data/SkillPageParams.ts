import { GameVersion } from '@/common/game/data/GameVersion';
import { GameType } from '@/common/game/data/GameType';
import { SkillOrder } from '@/feature/skill/data/SkillOrder';
import { TableType } from '@/feature/skill/data/TableType';
import { TableDataType } from '@/feature/skill/data/TableDataType';

export interface SkillPageParams {
    id: number;
    game: GameType;
    pageType: TableDataType;
    version: GameVersion;
    page?: number;
    order?: SkillOrder;
    display: TableType;
}
