export const convertPatternCode = (
    ptcode: number,
    type: 'image' | 'image300' | 'text',
) => {
    switch (ptcode) {
        case 1:
            if (type === 'text') {
                return 'BAS-G';
            }
            if (type === 'image') {
                return 'basg_600.png';
            }
            if (type === 'image300') {
                return 'basg_300.png';
            }
            break;
        case 2:
            if (type === 'text') {
                return 'ADV-G';
            }
            if (type === 'image') {
                return 'advg_600.png';
            }
            if (type === 'image300') {
                return 'advg_300.png';
            }
            break;
        case 3:
            if (type === 'text') {
                return 'EXT-G';
            }
            if (type === 'image') {
                return 'extg_600.png';
            }
            if (type === 'image300') {
                return 'extg_300.png';
            }
            break;
        case 4:
            if (type === 'text') {
                return 'MAS-G';
            }
            if (type === 'image') {
                return 'masg_600.png';
            }
            if (type === 'image300') {
                return 'masg_300.png';
            }
            break;
        case 5:
            if (type === 'text') {
                return 'BAS-B';
            }
            if (type === 'image') {
                return 'basb_600.png';
            }
            if (type === 'image300') {
                return 'basb_300.png';
            }
            break;
        case 6:
            if (type === 'text') {
                return 'ADV-B';
            }
            if (type === 'image') {
                return 'advb_600.png';
            }
            if (type === 'image300') {
                return 'advb_300.png';
            }
            break;
        case 7:
            if (type === 'text') {
                return 'EXT-B';
            }
            if (type === 'image') {
                return 'extb_600.png';
            }
            if (type === 'image300') {
                return 'extb_300.png';
            }
            break;
        case 8:
            if (type === 'text') {
                return 'MAS-B';
            }
            if (type === 'image') {
                return 'masb_600.png';
            }
            if (type === 'image300') {
                return 'masb_300.png';
            }
            break;
        case 9:
            if (type === 'text') {
                return 'BAS-D';
            }
            if (type === 'image') {
                return 'basd_600.png';
            }
            if (type === 'image300') {
                return 'basd_300.png';
            }
            break;
        case 10:
            if (type === 'text') {
                return 'ADV-D';
            }
            if (type === 'image') {
                return 'advd_600.png';
            }
            if (type === 'image300') {
                return 'advd_300.png';
            }
            break;
        case 11:
            if (type === 'text') {
                return 'EXT-D';
            }
            if (type === 'image') {
                return 'extd_600.png';
            }
            if (type === 'image300') {
                return 'extd_300.png';
            }
            break;
        case 12:
            if (type === 'text') {
                return 'MAS-D';
            }
            if (type === 'image') {
                return 'masd_600.png';
            }
            if (type === 'image300') {
                return 'masd_300.png';
            }
            break;
        default:
            break;
    }
};
