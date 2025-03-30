export interface Notice {
    id: number;
    titleK: string;
    titleJ: string;
    titleE: string;
    contentK: string;
    contentJ: string;
    contentE: string;
    time: Date;
}

export interface NoticeDisplay {
    id: number;
    title: string;
    content: string;
    time: Date;
}
