import { GameType } from '@/data/game/GameType';
import { GameVersion } from '@/data/game/GameVersion';
import { Order } from '@/data/filter/Order';
import { SkillPageParams } from '@/data/skill/SkillPageParams';

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
        self: (type: GameType) => `/skill/my/${type}`,
        skill: ({
            version,
            type,
            id,
            pageType,
            page = 1,
            order,
        }: SkillPageParams) => {
            const params = new URLSearchParams();
            params.set('type', type);
            params.set('pageType', pageType);
            params.set('page', String(page));
            if (version) params.set('version', String(version));
            if (order) params.set('order', order);
            return `/skill/${id}${params.size && `?${params.toString()}`}`;
        },
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
        login: `/auth/signin`,
    },
};
