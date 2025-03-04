export interface UpdateSkillInfo {
    musictitle: string;
    version: number;
    uid: number;
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
