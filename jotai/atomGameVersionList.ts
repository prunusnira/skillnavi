import { GameVersion } from '@/data/game/GameVersion';
import { atom } from 'jotai';

export const AtomGameVersionList = atom<GameVersion[] | undefined>(undefined);
