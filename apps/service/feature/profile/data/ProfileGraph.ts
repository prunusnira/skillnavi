export interface ProfileGraphRaw {
    date: string;
    gf: number;
    dm: number;
}

export interface ProfileGraph {
    date: string;
    value: number;
}

export interface ProfileGraphUI {
    gfmin?: number;
    gfmax?: number;
    dmmin?: number;
    dmmax?: number;
}
