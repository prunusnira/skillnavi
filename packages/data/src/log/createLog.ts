import { API_LOG_URL, LogParams } from './Log.data';
import { fetchExtended } from '../fetchExtended/FetchExtended';

export const createLog = async ({ uid, action, data }: LogParams) => {
    fetchExtended.post(API_LOG_URL, {
        body: JSON.stringify({ uid, action, data }),
    });
};