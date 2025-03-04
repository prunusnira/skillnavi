import { SkillForTable } from '@/feature/skill/data/Skill';
import { Music } from '@/feature/music/data/Music';
import { Pattern } from '@/feature/music/data/Pattern';

export interface SkillTableData extends SkillForTable {
    music: Music;
    pattern: Pattern;
}
