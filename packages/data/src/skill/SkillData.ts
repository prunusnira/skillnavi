export interface SkillData {
    ptcode: number;
    level: number;
    playcount: number;
    clearcount: number;
    clearstat: string;
    rank: string;
    rate: string;
    score: number;
    combo: number;
    meter: string;
}

export interface MusicSkill {
    musictitle: string;
    data: SkillData[];
}

export interface UpdateSkill {
    version: number;
    uid: number;
    musicData: MusicSkill[];
}