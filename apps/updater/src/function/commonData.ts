const PREFIX = 'https://sin.nira.one';

export const UrlUploadProfile = `${PREFIX}/api/update/profile`;
export const UrlUploadSkill = `${PREFIX}/api/update/skill`;
export const UrlUploadBoard = (uid: number) => `${PREFIX}/api/update/board?uid=${uid}`;