import { Skill } from '@/feature/skill/data/Skill';

export interface Pattern {
    mid: number;
    patterncode: number;
    version: number;
    level: number;
    skill?: Skill;
}
