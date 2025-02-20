export interface UserPlayCount {
    id: number;
    titletower: string;
    name: string;
    openinfo: boolean;
    gcount: number;
    dcount: number;
}

export interface PlayCount {
    pages: number;
    users: UserPlayCount[];
}
