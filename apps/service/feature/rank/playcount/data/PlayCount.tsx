export interface PlayCountRankData {
    uid: number;
    gcount: number;
    dcount: number;
    allcount: number;
}

export interface UserPlayCount {
    id: number;
    titletower: string;
    name: string;
    openinfo: boolean;
    gcount: number;
    dcount: number;
    allcount: number;
}

export interface PlayCount {
    pages: number;
    users: UserPlayCount[];
}
