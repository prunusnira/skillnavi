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
        return short ? 'EXC' : 'EXCELLENT';
    }
    if (fc && rate < 10000) {
        return short ? 'FC' : 'FULL COMBO';
    }
    return '';
};
