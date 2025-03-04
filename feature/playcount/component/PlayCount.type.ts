export const PlayCountType = {
    music: 'music',
    pattern: 'pattern',
    gf: 'gf',
    dm: 'dm',
};

export interface PlayCountResponse {
    id: number;
    name: string;
    patterncode: number;
    playcount: number;
}
