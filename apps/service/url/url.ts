import { GameType } from '@/common/game/data/GameType';
import { Order } from '@/common/filter/Order';
import { SkillPageParams } from '@/feature/skill/data/SkillPageParams';

export const IMG = process.env.NEXT_PUBLIC_URL_IMG || '';
export const ALBUM = process.env.NEXT_PUBLIC_URL_ALBUM || '';

export const PUBLICEP = process.env.NEXT_PUBLIC_URL_PUBLICEP || '';

export const LINK_MAIN = '/';
export const LINK_PROFILE_SELF = '/profile';
export const LINK_PROFILE_MAIN = (id: number) => `/profile/${id}`;
export const LINK_PROFILE_MYSKILL = (type: GameType) => `/myskill/${type}`;
export const LINK_PLAYCOUNT = '/playcount'; // 기존의 마이베스트임
export const LINK_SNAPSHOT = '/snapshot';
export const LINK_SKILL_RECENT = '/recent';
export const LINK_SKILL_EXC = (type: GameType) => `/skill/exc/${type}`;
export const LINK_SKILL_SELF = (type: GameType) => `/skill/my/${type}`;
export const LINK_SKILL_TABLE = ({
                                     version,
                                     game,
                                     id,
                                     pageType,
                                     page = 1,
                                     order,
                                     display,
                                 }: SkillPageParams) => {
    const params = new URLSearchParams();
    params.set('game', game);
    params.set('pageType', pageType);
    params.set('page', String(page));
    params.set('version', String(version));
    params.set('display', display);
    if (order) params.set('order', order);
    return `/skill/${id}${params.size && `?${params.toString()}`}`;
};
export const LINK_MUSIC_LIST = ``;
export const LINK_MUSIC_INFO = (
    {
        version,
        mid,
        uid,
    }: {
        version: number;
        mid: number;
        uid: number;
    },
) => `/music/info?mid=${mid}&uid=${uid}&version=${version}`;

export const LINK_PATTERN_LIST = ({
                                      version,
                                      order,
                                      page,
                                  }: {
    version?: number;
    order?: Order;
    page?: number;
}) => {
    const searchParams = new URLSearchParams();
    if (version) {
        searchParams.set('version', String(version));
    }
    if (order) {
        searchParams.set('order', order);
    }
    if (page) {
        searchParams.set('page', String(page));
    }
    const query = searchParams.toString();
    return `/music/list${query.length > 0 ? `?${query}` : ''}`;
};
export const LINK_PATTERN_TABLE = ({
                                       type,
                                       id,
                                   }: {
    type?: GameType;
    id?: number;
}) => {
    const params = new URLSearchParams();
    if (type) {
        params.set('type', type || 'gf');
    }
    if (id) {
        params.set('id', id.toString());
    }
    return `/cleartable?${params.toString()}`;
};
export const LINK_PATTERN_RANK = (
    version: string,
    page: number,
    mid: string,
    ptcode: number,
) =>
    `/pattern/rank?mid=${mid}&page=${page}&version=${version}&ptcode=${ptcode}`;
export const LINK_TOWER_MAIN = '/tower';
export const LINK_TOWER_DETAIL = '/tower/detail';
export const LINK_AUTH_LOGIN = `/auth/signin`;
export const LINK_RANK_SKILL = (type: GameType, page: number) =>
    `/rank/skill?type=${type}&page=${page}`;
export const LINK_RANK_PLAYCOUNT = (page: number) =>
    `/rank/playcount?page=${page}`;
