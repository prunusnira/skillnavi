import { GameType } from '@/common/game/data/GameType';

export interface SnapshotMap {
    gf: string[][];
    dm: string[][];
}

export interface SnapshotSkill {
    ptcode: number;
    rate: number;
    meter: string;
    skill: number;
    mid: number;
    rank: string;
    lv: number;
    mname: string;
    version: number;
    fc: 'Y' | 'N';
}

export interface SnapshotData {
    date: string;
    uid: number;
    uname: string;
    type: GameType;
    hot: SnapshotSkill[];
    oth: SnapshotSkill[];
}