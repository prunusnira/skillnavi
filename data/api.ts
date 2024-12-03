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
    SKILL: {
        table: '/skill',
    },
};
