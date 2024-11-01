export type GameVersion =
    | 0 // all
    | 1 // gf1
    | 2 // gf2dm1
    | 3 // gf3dm2
    | 4 // gf4dm3
    | 5 // gf5dm4
    | 6 // gf6dm5
    | 7 // gf7dm6
    | 8 // gf8dm7
    | 9 // gf9dm8
    | 10 // gf10dm9
    | 11 // gf11dm10
    | 12 // eemall
    | 13 // v
    | 14 // v2
    | 15 // v3
    | 16 // v4
    | 17 // v5
    | 18 // v6
    | 19 // xg
    | 20 // xg2
    | 21 // xg3
    | 22 // gd
    | 23 // od
    | 24 // tb
    | 25 // tbre
    | 26 // mx
    | 27 // ex
    | 28 // nx
    | 29 // hv
    | 30 // fu
    | 31; // gw

export const GameTitleShort = [
    'ALL',
    'GF1',
    'GF2DM1',
    'GF3DM2',
    'GF4DM3',
    'GF5DM4',
    'GF6DM5',
    'GF7DM6',
    'GF8DM7',
    'GF9DM8',
    'GF10DM9',
    'GF11DM10',
    "ee'mall",
    'V',
    'V2',
    'V3',
    'V4',
    'V5',
    'V6',
    'XG',
    'XG2',
    'XG3',
    'GD',
    'OD',
    'TB',
    'TBRE',
    'MX',
    'EX',
    'NX',
    'HV',
    'FU',
    'GW',
] as const;

export const GameTitleFull = [
    'ALL',
    'GuitarFreaks',
    'GuitarFreaks 2nd & drummania',
    'GuitarFreaks 3rd & drummania 2nd',
    'GuitarFreaks 4th & drummania 3rd',
    'GuitarFreaks 5th & drummania 4th',
    'GuitarFreaks 6th & drummania 5th',
    'GuitarFreaks 7th & drummania 6th',
    'GuitarFreaks 8th & drummania 7th',
    'GuitarFreaks 9th & drummania 8th',
    'GuitarFreaks 10th & drummania 9th',
    'GuitarFreaks 11th & drummania 10th',
    "ee'mall",
    'GuitarFreaks & DrumMania V',
    'GuitarFreaks & DrumMania V2',
    'GuitarFreaks & DrumMania V3',
    'GuitarFreaks & DrumMania V4',
    'GuitarFreaks & DrumMania V5',
    'GuitarFreaks & DrumMania V6',
    'GuitarFreaks & DrumMania XG',
    'GuitarFreaks & DrumMania XG2',
    'GuitarFreaks & DrumMania XG3',
    'GITADORA',
    'GITADORA OverDrive',
    'GITADORA Tri-Boost',
    'GITADORA Tri-Boost Re:Evolve',
    'GITADORA Matixx',
    'GITADORA EXCHAIN',
    'GITADORA NEXTAGE',
    'GITADORA High-Voltage',
    'GITADORA Fuzz-Up',
    'GITADORA Galaxy Wave',
] as const;

export type TitleShort = (typeof GameTitleShort)[number];
export type TitleFull = (typeof GameTitleFull)[number];

export interface Version {
    id: GameVersion;
    short: TitleShort;
    full: TitleFull;
}

export const getGameVersion = (versionCode: GameVersion): Version => ({
    id: versionCode,
    short: GameTitleShort[versionCode],
    full: GameTitleFull[versionCode],
});
