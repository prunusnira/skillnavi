import { fetchAdv } from '@/lib/fetch/fetchAdv';
import { Skill } from '@/feature/skill/data/Skill';
import { API_SKILL_TOWER } from '@/url/api';

export const getTowerDetailUserData = async (
    { mids, uid, game }: { mids: number[], uid: number, game: string },
) => {
    return fetchAdv.get<Skill[]>(API_SKILL_TOWER, {
        params: {
            midList: JSON.stringify(mids),
            uid,
            game,
        },
    });
};