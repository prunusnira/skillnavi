import { Pattern } from '@/feature/music/data/Pattern';
import { Skill } from '@/feature/skill/data/Skill';

export interface MusicListPageData {
    mid: number;
    name: string;
    composer: string;
    version: number;
    remove: number;
    patterns: Pattern[];
    skills: Skill[];
}

export interface MusicListPage {
    count: number;
    music: MusicListPageData[];
}
