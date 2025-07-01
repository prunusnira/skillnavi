import { atom } from 'jotai';
import { RankType } from '@/feature/music/data/RankSelector';

export const atomMusicRank = atom<RankType[]>([]);
