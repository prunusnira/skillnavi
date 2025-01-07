export const getPatternTypeFromCode = (code: number) => {
    switch (code) {
        case 1:
        case 5:
        case 9:
            return 'BASIC';
        case 2:
        case 6:
        case 10:
            return 'ADANCED';
        case 3:
        case 7:
        case 11:
            return 'EXTREME';
        case 4:
        case 8:
        case 12:
            return 'MASTER';
        default:
            return '';
    }
};
