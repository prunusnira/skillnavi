export interface SkillRank {
    uid: number;
    name: string;
    value: number;
}

export interface SkillRankReturn {
    rank: SkillRank[];
    pages: number;
}
