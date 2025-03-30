import { GameVersion } from '@/common/game/data/GameVersion';
import { atom } from 'jotai';

export const atomGameVersionList = atom<GameVersion[] | undefined>(undefined);
export const atomGameVersionLatest = atom<GameVersion | undefined>(undefined);
