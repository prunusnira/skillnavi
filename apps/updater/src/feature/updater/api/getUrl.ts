import { API_UPDATE_URL } from '../../../common/api';
import { UpdateUrl } from '../../crawler/type/Url.atom.type';

export const getUrl = async () => {
    const result = await fetch(API_UPDATE_URL);
    if (!result.ok) {
        return null;
    }
    return (await result.json()) as UpdateUrl[];
};