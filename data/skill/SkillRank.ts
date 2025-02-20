export interface SkillRank {
    uid: number;
    name: string;
    titletower: string;
    openinfo: boolean;
    value: number;
}

export interface SkillRankReturn {
    rank: SkillRank[];
    pages: number;
}
