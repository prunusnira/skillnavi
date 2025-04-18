export type LogAction =
    | 'update'
    | 'pageview'
    | 'click';

export interface LogParams {
    uid: number;
    action: LogAction;
    data: string;
}

export const API_LOG_URL = 'https://sin.nira.one/api/log';