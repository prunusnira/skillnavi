export type PatternDifficultyCompareSort = 'song' | 'difference';

export interface PatternDifficultyCompareRow {
    mid: number;
    name: string;
    patterncode: number;
    version1Level: number | null;
    version2Level: number | null;
    difference: number | null;
}

export interface PatternDifficultyCompareResult {
    count: number;
    pages: number;
    page: number;
    rows: PatternDifficultyCompareRow[];
}
