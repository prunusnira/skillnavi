import { useQuery } from '@tanstack/react-query';
import { getNotice } from '@/module/api/notice/getNotice';
import { useLocale } from 'next-intl';
import { Notice, NoticeDisplay } from '@/data/notice/Notice';

const useNotice = () => {
    const locale = useLocale();

    const { data: notice } = useQuery({
        queryKey: ['notice'],
        queryFn: () =>
            getNotice({
                page: 1,
                size: 4,
            }),
    });

    // 받아온 공지사항에서 현재 로케일에 맞는 공지사항만 골라내기
    const getCurrentLocale = (notice: Notice[]): NoticeDisplay[] => {
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

    return {
        notice: notice && getCurrentLocale(notice),
    };
};

export default useNotice;
