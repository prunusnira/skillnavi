import { GameType } from '@/data/game/GameType';
import { GameVersion } from '@/data/game/GameVersion';
import { Order } from '@/data/filter/Order';

export const IMG = process.env.NEXT_PUBLIC_URL_IMG || '';

export const LINK = {
    MAIN: '/',
    PROFILE: {
        self: '/profile',
        main: (id: number) => `/profile/${id}`,
        myskill: (type: GameType) => `/myskill/${type}`,
        playcount: '/playcount', // 기존의 마이베스트임
        snapshot: '/snapshot',
    },
    SKILL: {
        recent: '/recent',
        ranking: (type: GameType, page: number) => `/rank/${type}/${page}`,
        exc: (type: GameType) => `/esc/${type}`,
        countrank: (page: number) => `/cntrank/${page}`,
    },
    PATTERN: {
        list: (
            version: GameVersion,
            order: Order,
            page: number,
            hot: boolean,
        ) => `/pattern/${version}/${order}/${page}?hot=${hot ? 'h' : 'o'}`,
        noplay: '/pattern/noplay',
        table: '/pattern/table',
    },
    TOWER: {
        main: '/tower',
    },
    AUTH: {
        login: '/login',
    },
};
