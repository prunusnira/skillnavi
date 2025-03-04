import { Pattern } from '@/feature/music/data/Pattern';

export interface MusicListPageData {
    mid: number;
    name: string;
    composer: string;
    version: number;
    remove: number;
    patterns: Pattern[];
}

export interface MusicListPage {
    count: number;
    music: MusicListPageData[];
}
