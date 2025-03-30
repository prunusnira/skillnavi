export const getGameTypeFromCode = (code: number) => {
    if (code < 5) return 'GUITAR';
    if (code < 9) return 'BASS';
    return 'DRUM';
};
