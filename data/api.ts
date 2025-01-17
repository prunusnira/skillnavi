export const API = {
    ENV: {
        version: `/env/version`,
    },
    NOTICE: `/notice`,
    PROFILE: {
        mine: '/profile',
        basic: '/profile/basic',
        id: `/profile/id`,
        old: {
            id: (id: string) => `/profile/old/${id}`,
        },
        graph: (id: string) => `/profile/${id}/graph`,
        skill: `/profile/skill`,
    },
    RECENT: '/recent',
    RECENTOLD: '/recent/old',
    SKILL: {
        table: '/skill',
    },
    MUSIC: {
        list: '/music/list',
        info: '/music/info',
        record: (mid: number) => `/music/${mid}/record`,
        pattern: (mid: number) => `/music/${mid}/pattern`,
    },
    PATTERN: {
        rank: '/pattern/rank',
        rankPages: '/pattern/rank/meta',
    },
};
