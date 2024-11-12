import { GameVersion } from '@/data/game/GameVersion';
import { GameType } from '@/data/game/GameType';
import { SkillPageType } from '@/data/skill/SkillPageType';
import { SkillOrder } from '@/data/skill/SkillOrder';

export interface SkillPageParams {
    id: number;
    type: GameType;
    pageType: SkillPageType;
    version?: GameVersion;
    page?: number;
    order?: SkillOrder;
}
