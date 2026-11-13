const PREFIX = 'https://sin.nira.one';

export const UrlUploadProfile = `${PREFIX}/api/update/profile`;
export const UrlUploadSkill = `${PREFIX}/api/update/skill`;
export const UrlCheckSkillDuplicates = `${PREFIX}/api/update/skill/check-duplicates`;
export const UrlUploadBoard = (uid: number) => `${PREFIX}/api/update/board?uid=${uid}`;
