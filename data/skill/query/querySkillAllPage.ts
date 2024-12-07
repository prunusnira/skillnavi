import { OrderType } from '@/data/skill/OrderType';

interface Params {
    userid: number;
    version: number;
    game: string;
    isHot?: boolean;
    isOthers?: boolean;
    page: number;
    order: OrderType;
}

const getOrder = (order: OrderType) => {
    switch (order) {
        case 'titleasc':
            return 'mname asc';
        case 'titledesc':
            return 'mname desc';
        case 'skillasc':
            return 'skill asc';
        case 'rateasc':
            return 'rate asc';
        case 'ratedesc':
            return 'rate desc';
        case 'skilldesc':
        default:
            return 'skill desc';
    }
};

const getQueryRateByVersion = (version: number) => {
    switch (version) {
        case 24:
            return 's.ratetb';
        case 25:
            return 's.ratetbre';
        case 26:
            return 's.ratemx';
        case 27:
            return 's.rateex';
        case 28:
            return 's.ratenx';
        case 29:
            return 's.ratehv';
        case 30:
            return 's.ratefu';
        case 0:
        default:
            return 's.rate';
    }
};

export const querySkillAllPage = ({
    userid,
    version,
    game,
    isHot,
    isOthers,
    page,
    order,
}: Params) => {
    let music = '';
    let rate = '';
    switch (version) {
        case 24:
            music = 'music_tb as m';
            rate = 'and s.ratetb > 0';
            break;
        case 25:
            music = 'music_tbre as m';
            rate = 'and s.ratetbre > 0';
            break;
        case 26:
            music = 'music_mx as m';
            rate = 'and s.ratemx > 0';
            break;
        case 27:
            music = 'music_ex as m';
            rate = 'and s.rateex > 0';
            break;
        case 28:
            music = 'music_nx as m';
            rate = 'and s.ratenx > 0';
            break;
        case 29:
            music = 'music_hv as m';
            rate = 'and s.ratehv > 0';
            break;
        case 30:
            music = 'music_fu as m';
            rate = 'and s.ratefu > 0';
            break;
        case 0:
        default:
            music = 'music as m';
            rate = 'and s.rate > 0';
            break;
    }

    let removal = '';
    if (version === 0) {
        removal = 'and m.removed < 1';
    } else {
        removal = `and (m.removed < 1 or m.removed > ${version - 23})`;
    }

    let ptcode = '';
    if (game === 'gf') {
        ptcode = 'and s.patterncode <= 8';
    } else {
        ptcode = 'and s.patterncode >= 9';
    }

    let hot = '';
    if (isHot) {
        hot = 'and m.hot = "Y"';
    }
    if (isOthers) {
        hot = 'and m.hot = "N"';
    }

    return `
SELECT *, data.rate * data.level * 20 as skill FROM (
        SELECT
            m.name        as mname,
            m.hurigana    as hurigana,
            m.id          as musicid,
            m.hot         as ishot,
            s.patterncode as patterncode,
            s.rank        as rank,
            ${getQueryRateByVersion(version)}        as rate,
            m.version     as version,
            s.playtime    as playtime,
            s.cleartime   as cleartime,
            s.combo       as combo,
            CASE
                WHEN s.patterncode = 1 THEN m.gbsc
                WHEN s.patterncode = 2 THEN m.gadv
                WHEN s.patterncode = 3 THEN m.gext
                WHEN s.patterncode = 4 THEN m.gmas
                WHEN s.patterncode = 5 THEN m.bbsc
                WHEN s.patterncode = 6 THEN m.badv
                WHEN s.patterncode = 7 THEN m.bext
                WHEN s.patterncode = 8 THEN m.bmas
                WHEN s.patterncode = 9 THEN m.dbsc
                WHEN s.patterncode = 10 THEN m.dadv
                WHEN s.patterncode = 11 THEN m.dext
                WHEN s.patterncode = 12 THEN m.dmas
                END       AS level,
            s.checkfc     as checkfc,
            s.meter       as meter
        FROM skill as s,
            ${music}
        WHERE s.musicid = m.id
            ${removal}
            AND s.userid = ${userid}
            ${hot}
            ${ptcode}
            ${rate}
    ) as data
    ORDER BY ${getOrder(order)}
    LIMIT 50 OFFSET ${(page - 1) * 50}
    `;
};
