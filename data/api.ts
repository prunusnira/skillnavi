export const API = {
    ENV: {
        version: `/env/version`,
    },
    NOTICE: `/notice`,
    PROFILE: {
        mine: '/profile',
        basic: '/profile/basic',
        id: (id: string) => `/profile/${id}`,
        old: {
            basic: '/profile/old/basic',
            id: (id: string) => `/profile/old/${id}`,
        },
        graph: (id: string) => `/profile/${id}/graph`,
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
};
