import { Pattern } from '@/feature/music/data/Pattern';

export interface Music {
    id: number;
    name: string;
    furigana: string;
    composer: string;
    version: number;
    hot: number;
    hot_end: number;
    remove: number;
    patterns?: Pattern[];
}
