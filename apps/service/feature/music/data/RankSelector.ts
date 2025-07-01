export const RankSelector = [
    'SS',
    'S',
    'A',
    'B',
    'C',
    'F',
    'NoData',
] as const;

export type RankType = (typeof RankSelector)[number];
