const PREFIX = '/api';

export const API_ENV_VERSION = `${PREFIX}/env/version`;
export const API_ENV_LATEST = `${PREFIX}/env/latest`;
export const API_USER_TOKEN = `${PREFIX}/user/token`;
export const API_NOTICE = `${PREFIX}/notice`;
export const API_PROFILE_BASIC = `${PREFIX}/profile/basic`;
export const API_PROFILE_ID = `${PREFIX}/profile/id`;
export const API_PROFILE_GRAPH = (id: string) =>
    `${PREFIX}/profile/${id}/graph`;
export const API_PROFILE_SKILL = `${PREFIX}/profile/skill`;
export const API_PROFILE_COMMENT = (id: string) =>
    `${PREFIX}/profile/${id}/comment`;
export const API_PROFILE_OPENDATA = (id: string) =>
    `${PREFIX}/profile/${id}/opendata`;
export const API_PROFILE_ICON = (id: number) => `${PREFIX}/profile/${id}/icon`;
export const API_PROFILE_RESET = (id: string) =>
    `${PREFIX}/profile/${id}/reset`;
export const API_RECENT = `${PREFIX}/recent`;
export const API_SKILL_TABLE = `${PREFIX}/skill/table`;
export const API_SKILL_TOWER = `${PREFIX}/skill/tower`;
export const API_MUSIC_LIST = `${PREFIX}/music/list`;
export const API_MUSIC_INFO = `${PREFIX}/music/info`;
export const API_MUSIC_INFOS = `${PREFIX}/music/infos`;
export const API_MUSIC_RECORD = (mid: number) =>
    `${PREFIX}/music/${mid}/record`;
export const API_MUSIC_PATTERN = (mid: number) =>
    `${PREFIX}/music/${mid}/pattern`;
export const API_PATTERN_RANK = `${PREFIX}/pattern/rank`;
export const API_PATTERN_RANK_META = `${PREFIX}/pattern/rank/meta`;
export const API_RANK_SKILL = `${PREFIX}/rank/skill`;
export const API_RANK_PLAYCOUNT = `${PREFIX}/rank/playcount`;
export const API_PLAYCOUNT = `${PREFIX}/playcount`;
export const API_CLEARTABLE = `${PREFIX}/cleartable`;
export const API_COOKIE = `${PREFIX}/cookie`;
export const API_TOWER_LIST = `${PREFIX}/tower/list`;
export const API_TOWER_INFO = (id: number) => `${PREFIX}/tower/list/${id}`;
export const API_TOWER_DETAIL = `${PREFIX}/tower/detail`;
export const API_TOWER_ICON = (id: number) => `${PREFIX}/tower/list/${id}/icon`;
export const API_USER_JOIN = `${PREFIX}/user/join`;
export const API_SNAPSHOT_LIST = `${PREFIX}/snapshot/list`;
export const API_SNAPSHOT_DETAIL = `${PREFIX}/snapshot/get`;
export const API_SNAPSHOT_CREATE = `${PREFIX}/snapshot/create`;
export const API_SEARCH = (type: string, value: string, page: number) =>
    `${PREFIX}/search?type=${type}&value=${value}&page=${page}`;
