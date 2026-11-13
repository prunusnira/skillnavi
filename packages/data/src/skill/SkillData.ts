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
    mid?: number;
}

export interface MusicDuplicateCandidate {
    mid: number;
    title: string;
    composer: string;
    patterns: Array<{
        patterncode: number;
        level: number | null;
    }>;
    jacketUrl: string | null;
}

export interface MusicDuplicateGroup {
    title: string;
    candidates: MusicDuplicateCandidate[];
}

export interface UpdateSkill {
    version: number;
    uid: number;
    musicData: MusicSkill[];
}
