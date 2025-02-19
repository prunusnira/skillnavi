import { SkillForTable } from '@/data/skill/Skill';
import { Music } from '@/data/music/Music';
import { Pattern } from '@/data/pattern/Pattern';

export interface SkillTableData extends SkillForTable {
    music: Music;
    pattern: Pattern;
}
