const PREFIX = '/api';

export const API = {
    ENV: {
        version: `${PREFIX}/env/version`,
        latest: `${PREFIX}/env/latest`,
    },
    USER: {
        token: '${PREFIX}/user/token',
    },
    NOTICE: `${PREFIX}/notice`,
    PROFILE: {
        mine: `${PREFIX}/profile`,
        basic: `${PREFIX}/profile/basic`,
        id: `${PREFIX}/profile/id`,
        old: {
            id: (id: string) => `${PREFIX}/profile/old/${id}`,
        },
        graph: (id: string) => `${PREFIX}/profile/${id}/graph`,
        skill: `${PREFIX}/profile/skill`,
    },
    RECENT: `${PREFIX}/recent`,
    RECENTOLD: `${PREFIX}/recent/old`,
    SKILL: {
        table: `${PREFIX}/skill/table`,
        rank: `${PREFIX}/skill/rank`,
    },
    MUSIC: {
        list: `${PREFIX}/music/list`,
        info: `${PREFIX}/music/info`,
        record: (mid: number) => `${PREFIX}/music/${mid}/record`,
        pattern: (mid: number) => `${PREFIX}/music/${mid}/pattern`,
    },
    PATTERN: {
        rank: `${PREFIX}/pattern/rank`,
        rankPages: `${PREFIX}/pattern/rank/meta`,
    },
};
