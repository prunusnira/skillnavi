import { Music } from '@/feature/music/data/Music';
import { Pattern } from '@/feature/music/data/Pattern';

export interface Skill {
    uid: number;
    mid: number;
    playver: number;
    patterncode: number;
    level: number;
    playcount: number;
    clearcount: number;
    maxrank: string;
    rate: number;
    combo: number;
    fc: boolean;
    meter: string | null;
    hot: number;
    skill: number;
}

export interface SkillForTable {
    mid: number;
    playver: number;
    patterncode: number;
    level: number;
    maxrank: string;
    rate: number;
    fc: boolean;
    hot: number;
    skill: number;
}

export interface SkillDataForOneTable {
    title?: string;
    data: SkillForTable[];
}

export interface SkillForTableWithInfo extends SkillForTable {
    music: Music;
    pattern: Pattern;
}

export interface SkillTableData {
    title?: string;
    data: SkillForTableWithInfo[];
}

export interface SkillReturn {
    data: SkillTableData[];
    pages: number;
}
