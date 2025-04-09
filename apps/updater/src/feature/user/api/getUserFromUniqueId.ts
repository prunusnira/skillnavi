import { API_USER_UNIQUEID } from '../../../common/api';
import { Profile } from '../component/Profile.type';

export const getUserFromUniqueId = async (id: string | null) => {
    if (!id) {
        return null;
    }

    const result = await fetch(`${API_USER_UNIQUEID}?token=${id}`, {
        method: 'GET',
    });

    if (!result.ok) {
        return null;
    }

    return (await result.json()) as Profile;
};