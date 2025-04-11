export const getTowerType = (type: string) => {
    switch (type) {
        case 'gf': return 'GuitarFreaks';
        case 'dm': return 'DrumMania';
        case 'sp': return 'Special';
        default: return '';
    }
}