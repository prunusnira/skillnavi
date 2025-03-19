export interface SkillMusicData {
    musictitle: string;
    data: {
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
    }[];
}

export interface UpdateSkillInfo {
    version: number;
    uid: number;
    musicData: SkillMusicData[];
}
