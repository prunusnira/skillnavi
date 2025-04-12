export type GameType = 'gf' | 'dm';
export type GameTypeAll = 'gf' | 'dm' | 'all';

export const isGameTypeAll = (type: unknown): type is GameTypeAll => {
    return typeof type === 'string' && (type === 'gf' || type === 'dm' || type === 'all');
};
