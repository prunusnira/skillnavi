import { Skill } from '@/data/skill/Skill';
import { Music } from '@/data/music/Music';
import { Pattern } from '@/data/pattern/Pattern';

export interface SkillTableData extends Skill {
    music: Music;
    pattern: Pattern;
}
