import { GameVersion } from '@skillnavi/data/src/version';
import { atom } from 'jotai';

export const atomGameVersionList = atom<GameVersion[] | undefined>(undefined);
export const atomGameVersionLatest = atom<GameVersion | undefined>(undefined);
