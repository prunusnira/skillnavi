export const convertRank = (rank: string) => {
    switch (rank) {
        case 'SS':
            return 'rank_ss.png';
        case 'S':
            return 'rank_s.png';
        case 'A':
            return 'rank_a.png';
        case 'B':
            return 'rank_b.png';
        case 'C':
            return 'rank_c.png';
        case 'D':
            return 'rank_d.png';
        case 'E':
            return 'rank_e.png';
    }
};
