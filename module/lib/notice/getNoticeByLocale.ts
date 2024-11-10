import { Notice, NoticeDisplay } from '@/data/notice/Notice';

export const getNoticeByLocale = (
    locale: string,
    notice?: Notice[],
): NoticeDisplay[] => {
    if (!notice) return [];

    if (locale === 'ko') {
        return notice.map((n) => ({
            id: n.id,
            title: n.titleK,
            content: n.contentK,
            time: n.time,
        }));
    }
    if (locale === 'ja') {
        return notice.map((n) => ({
            id: n.id,
            title: n.titleJ,
            content: n.contentJ,
            time: n.time,
        }));
    }
    return notice.map((n) => ({
        id: n.id,
        title: n.titleE,
        content: n.contentE,
        time: n.time,
    }));
};
