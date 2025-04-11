export interface TowerList {
    id: number;
    name: string;
    game: string;
    display: string;
    floors: number;
    update_at: Date;
}

export interface TowerItem {
    tid: number;
    floor: number;
    mid: number;
    ptcode: number;
    compulsory: boolean;
    rate: number;
    fc: boolean;
    description: string;
}