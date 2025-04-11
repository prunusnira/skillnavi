import { Music } from '@/feature/music/data/Music';
import { Skill } from '@/feature/skill/data/Skill';

export interface TowerList {
    id: number;
    name: string;
    game: string;
    display: string;
    floors: number;
    update_at: Date;
}

export interface TowerItem {
    tid: number;
    floor: number;
    mid: number;
    ptcode: number;
    compulsory: boolean;
    rate: number;
    fc: boolean;
    description: string;
}

export interface TowerDetailDisplay {
    item: TowerItem;
    music: Music;
    isCleared: boolean;
    data?: Skill;
}