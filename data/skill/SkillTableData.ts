import { SkillData } from '@/data/skill/Skill';
import { MusicData } from '@/data/music/Music';
import { PatternData } from '@/data/pattern/Pattern';

export interface SkillTableData extends SkillData {
    music: MusicData;
    pattern: PatternData;
}
