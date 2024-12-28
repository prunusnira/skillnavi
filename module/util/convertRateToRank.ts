export const convertRateToRank = (rate: number) => {
    if (rate < 6300) {
        return 'C';
    }
    if (rate < 7300) {
        return 'B';
    }
    if (rate < 8000) {
        return 'A';
    }
    if (rate < 9500) {
        return 'S';
    }
    return 'SS';
};
