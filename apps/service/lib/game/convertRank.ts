export const convertRank = (maxrank: string, rate: number) => {
    let rank = maxrank;

    if (rank == '') {
        if (rate >= 9500) {
            rank = 'SS';
        } else if (rate >= 8000) {
            rank = 'S';
        } else if (rate >= 7300) {
            rank = 'A';
        } else if (rate >= 6300) {
            rank = 'B';
        } else {
            rank = 'C';
        }
    }

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
