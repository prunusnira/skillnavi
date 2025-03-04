export const getClearState = ({
    rate,
    fc,
    short,
}: {
    rate: number;
    fc: boolean;
    short?: boolean;
}) => {
    if (fc && rate === 10000) {
        if (short) {
            return 'PF';
        }
        return 'PERFECT';
    }
    if (fc && rate < 10000) {
        if (short) {
            return 'FC';
        }
        return 'FULLCOMBO';
    }
    if (short) {
        return 'CL';
    }
    return 'CLEARED';
};
