interface Params {
    userid: number;
    version: number;
    game: string;
    isHot?: boolean;
    isOthers?: boolean;
}

export const querySkillAll = ({
    userid,
    version,
    game,
    isHot,
    isOthers,
}: Params) => {
    let music = '';
    let rate = '';
    switch (version) {
        case 1:
            music = 'music_tb as m';
            rate = 'and s.ratetb > 0';
            break;
        case 2:
            music = 'music_tbre as m';
            rate = 'and s.ratetbre > 0';
            break;
        case 3:
            music = 'music_mx as m';
            rate = 'and s.ratemx > 0';
            break;
        case 4:
            music = 'music_ex as m';
            rate = 'and s.rateex > 0';
            break;
        case 5:
            music = 'music_nx as m';
            rate = 'and s.ratenx > 0';
            break;
        case 6:
            music = 'music_hv as m';
            rate = 'and s.ratehv > 0';
            break;
        case 7:
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
        removal = `and (m.removed < 1 or m.removed > ${version})`;
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
        SELECT
            m.name        as mname,
            m.hurigana    as hurigana,
            m.id          as musicid,
            m.hot         as ishot,
            s.patterncode as patterncode,
            s.rank        as rank,
            s.rate        as rate,
            s.ratefu      as ratefu,
            s.ratehv      as ratehv,
            s.ratenx      as ratenx,
            s.rateex      as rateex,
            s.ratemx      as ratemx,
            s.ratetbre    as ratetbre,
            s.ratetb      as ratetb,
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
    `;
};
