export interface Skill {
    uid: number;
    mid: number;
    playver: number;
    patterncode: number;
    level: number;
    playcount: number;
    clearcount: number;
    maxrank: string;
    rate: number;
    combo: number;
    fc: boolean;
    meter: string | null;
    hot: number;
    skill: number;
}

export interface SkillForTable {
    mid: number;
    playver: number;
    patterncode: number;
    level: number;
    maxrank: string;
    rate: number;
    fc: boolean;
    hot: number;
    skill: number;
}
